/**
 * Edge-функция для отправки заявок на email
 * 
 * @description Надёжная отправка форм обратной связи через Resend
 * Включает rate limiting, валидацию и защиту от спама
 */

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/** Простой in-memory rate limiter по IP */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 минут

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// Очистка старых записей каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
}

/** Валидация данных формы */
function validateFormData(data: unknown): { valid: true; data: ContactFormData } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Некорректные данные" };
  }

  const d = data as Record<string, unknown>;

  // Имя: 2-100 символов
  const name = typeof d.name === "string" ? d.name.trim() : "";
  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: "Имя должно содержать от 2 до 100 символов" };
  }

  // Телефон: формат +7XXXXXXXXXX
  const phone = typeof d.phone === "string" ? d.phone.replace(/[\s()-]/g, "") : "";
  if (!/^\+7\d{10}$/.test(phone)) {
    return { valid: false, error: "Некорректный формат телефона" };
  }

  // Email (необязательный)
  const email = typeof d.email === "string" ? d.email.trim() : undefined;
  if (email && (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return { valid: false, error: "Некорректный email" };
  }

  // Сообщение (необязательное, до 1000 символов)
  const message = typeof d.message === "string" ? d.message.trim() : undefined;
  if (message && message.length > 1000) {
    return { valid: false, error: "Сообщение не должно превышать 1000 символов" };
  }

  // Источник
  const source = typeof d.source === "string" ? d.source.trim().slice(0, 100) : "Неизвестно";

  return {
    valid: true,
    data: {
      name,
      phone: typeof d.phone === "string" ? d.phone.trim() : phone,
      email: email || undefined,
      message: message || undefined,
      source,
    },
  };
}

/** Экранирование HTML для предотвращения инъекций */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Генерация HTML-письма в стиле сайта
 */
const generateEmailHtml = (data: ContactFormData): string => {
  const currentDate = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const safeName = escapeHtml(data.name);
  const safePhone = escapeHtml(data.phone);
  const safePhoneHref = data.phone.replace(/[^\d+]/g, '');
  const safeEmail = data.email ? escapeHtml(data.email) : '';
  const safeMessage = data.message ? escapeHtml(data.message) : '';
  const safeSource = escapeHtml(data.source);

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          
          <!-- Шапка -->
          <tr>
            <td style="background: linear-gradient(135deg, #00407e 0%, #00a3d5 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                Новая заявка с сайта
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Стеклопром Ростов
              </p>
            </td>
          </tr>
          
          <!-- Источник заявки -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #e8f4fd; border-radius: 8px; padding: 12px 16px;">
                    <span style="color: #00407e; font-size: 13px; font-weight: 600;">
                      Источник: ${safeSource}
                    </span>
                    <span style="color: #718096; font-size: 13px; margin-left: 16px;">
                      ${currentDate} (МСК)
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Данные клиента -->
          <tr>
            <td style="padding: 24px 40px;">
              <h2 style="margin: 0 0 20px; color: #2D3748; font-size: 18px; font-weight: 600;">
                Данные клиента
              </h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Имя</span>
                    <span style="color: #2D3748; font-size: 16px; font-weight: 600;">${safeName}</span>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Телефон</span>
                    <a href="tel:${safePhoneHref}" style="color: #00a3d5; font-size: 18px; font-weight: 700; text-decoration: none;">
                      ${safePhone}
                    </a>
                  </td>
                </tr>
                
                ${safeEmail ? `
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Email</span>
                    <a href="mailto:${safeEmail}" style="color: #00a3d5; font-size: 16px; text-decoration: none;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                ` : ''}
                
                ${safeMessage ? `
                <tr>
                  <td style="padding: 14px 0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Сообщение</span>
                    <p style="margin: 0; color: #2D3748; font-size: 15px; line-height: 1.6; background-color: #F7FAFC; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #00a3d5;">
                      ${safeMessage}
                    </p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Кнопка звонка -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <a href="tel:${safePhoneHref}" style="display: block; background: linear-gradient(135deg, #ff342f 0%, #e02e29 100%); color: #ffffff; text-align: center; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; box-shadow: 0 4px 16px rgba(255, 52, 47, 0.3);">
                Позвонить клиенту
              </a>
            </td>
          </tr>
          
          <!-- Подвал -->
          <tr>
            <td style="background-color: #F7FAFC; padding: 20px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0; color: #718096; font-size: 12px;">
                Это автоматическое уведомление с сайта Стеклопром
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const handler = async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting по IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: "Слишком много запросов. Попробуйте позже." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawData = await req.json();

    // Валидация
    const validation = validateFormData(rawData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data = validation.data;

    // Отправка письма
    const emailResponse = await resend.emails.send({
      from: "Стеклопром <onboarding@resend.dev>",
      to: ["ms.yyy2014@mail.ru"],
      subject: `Новая заявка: ${escapeHtml(data.name)} — ${data.phone.replace(/[^\d+]/g, '')}`,
      html: generateEmailHtml(data),
    });

    console.log("Email отправлен успешно");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error("Ошибка отправки email:", error instanceof Error ? error.message : String(error));

    return new Response(
      JSON.stringify({ success: false, error: "Не удалось отправить заявку. Пожалуйста, попробуйте позже или позвоните нам." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
