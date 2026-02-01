/**
 * Страница Contacts — контакты
 * 
 * @description Контактная информация компании «Стеклопром»
 */

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { formatPhone, handlePhoneKeyDown } from '@/utils/phoneFormat';

/**
 * Контактная информация — телефон и email будут обновлены клиентом
 */
const CONTACT_INFO = {
  phone: '+7 (863) 123-45-67',
  phoneHref: 'tel:+78631234567',
  email: 'info@stekloprom-rostov.ru',
  address: 'г. Ростов-на-Дону',
  workHours: {
    weekdays: 'Понедельник — Пятница: 8:00 — 18:00',
    saturday: 'Суббота: 8:00 — 18:00',
    sunday: 'Воскресенье: выходной',
  },
};

/**
 * Компонент ContactsPage
 */
const ContactsPage = () => {
  const { setMeta } = useSeoMeta();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Контакты Стеклопром — адрес, телефон, режим работы в Ростове-на-Дону',
      description: 'Контакты компании «Стеклопром» в Ростове-на-Дону. Адрес производства: ул. Промышленная, 15. Телефон: +7 (863) 123-45-67. Режим работы: Пн-Пт 8:00-18:00, Сб 9:00-15:00. Приезжайте на экскурсию!',
      keywords: 'контакты Стеклопром Ростов, адрес производства стеклопакетов, телефон стеклопакеты Ростов-на-Дону, как добраться Стеклопром',
    });

    // Добавляем структурированные данные для контактов
    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Стеклопром',
      description: 'Производство стеклопакетов в Ростове-на-Дону',
      telephone: '+7 (863) 123-45-67',
      email: 'info@stekloprom-rostov.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Промышленная, 15',
        addressLocality: 'Ростов-на-Дону',
        addressRegion: 'Ростовская область',
        postalCode: '344000',
        addressCountry: 'RU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.2357,
        longitude: 39.7015,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '15:00',
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-contact-schema', 'true');
    script.textContent = JSON.stringify(contactSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[data-contact-schema]');
      if (existing) existing.remove();
    };
  }, [setMeta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      setFormData({
        ...formData,
        phone: formatPhone(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhoneKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, formData.phone, (value) => {
      setFormData((prev) => ({ ...prev, phone: value }));
    });
  };

  return (
    <Layout withPadding>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <Breadcrumbs items={[{ label: 'Контакты' }]} />

        {/* Заголовок */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '42px',
            fontWeight: 700,
            color: '#2D3748',
            margin: '0 0 16px 0',
          }}>
            Контакты
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            color: '#718096',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: 0,
          }}>
            Свяжитесь с нами любым удобным способом. Мы всегда рады ответить 
            на ваши вопросы и помочь с выбором стеклопакетов.
          </p>
        </header>

        {/* Основной контент */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Контактная информация */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Телефон */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #ff342f 0%, #e02e29 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 16px rgba(255, 52, 47, 0.25)',
              }}>
                <Phone size={26} color="#ffffff" />
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2D3748',
                  margin: '0 0 8px 0',
                }}>
                  Телефон
                </h2>
                <a
                  href={CONTACT_INFO.phoneHref}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#003366',
                    textDecoration: 'none',
                  }}
                >
                  {CONTACT_INFO.phone}
                </a>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#718096',
                  margin: '8px 0 0 0',
                }}>
                  Звоните, мы на связи!
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'rgba(0, 51, 102, 0.1)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#003366',
              }}>
                <Mail size={26} />
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2D3748',
                  margin: '0 0 8px 0',
                }}>
                  Email
                </h2>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#003366',
                    textDecoration: 'none',
                  }}
                >
                  {CONTACT_INFO.email}
                </a>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#718096',
                  margin: '8px 0 0 0',
                }}>
                  Ответим быстро и оперативно
                </p>
              </div>
            </div>

            {/* Адрес */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'rgba(0, 51, 102, 0.1)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#003366',
              }}>
                <MapPin size={26} />
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2D3748',
                  margin: '0 0 8px 0',
                }}>
                  Адрес
                </h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#2D3748',
                  margin: 0,
                }}>
                  {CONTACT_INFO.address}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#718096',
                  margin: '8px 0 0 0',
                }}>
                  Производство и офис
                </p>
              </div>
            </div>

            {/* Режим работы */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'rgba(0, 51, 102, 0.1)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#003366',
              }}>
                <Clock size={26} />
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2D3748',
                  margin: '0 0 12px 0',
                }}>
                  Режим работы
                </h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#2D3748',
                    marginBottom: '6px',
                  }}>
                    {CONTACT_INFO.workHours.weekdays}
                  </li>
                  <li style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#2D3748',
                    marginBottom: '6px',
                  }}>
                    {CONTACT_INFO.workHours.saturday}
                  </li>
                  <li style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#718096',
                  }}>
                    {CONTACT_INFO.workHours.sunday}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(0, 51, 102, 0.08)',
            borderRadius: '20px',
            padding: '40px',
          }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#2D3748',
              margin: '0 0 8px 0',
            }}>
              Написать нам
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#718096',
              margin: '0 0 32px 0',
            }}>
              Заполните форму и мы свяжемся с вами
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D3748',
                    marginBottom: '8px',
                  }}
                >
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid rgba(0, 51, 102, 0.1)',
                    borderRadius: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#2D3748',
                    background: '#F8F9FA',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D3748',
                    marginBottom: '8px',
                  }}
                >
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDownWrapper}
                  placeholder="+7 (___) ___-__-__"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid rgba(0, 51, 102, 0.1)',
                    borderRadius: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#2D3748',
                    background: '#F8F9FA',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D3748',
                    marginBottom: '8px',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid rgba(0, 51, 102, 0.1)',
                    borderRadius: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#2D3748',
                    background: '#F8F9FA',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D3748',
                    marginBottom: '8px',
                  }}
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Опишите ваш вопрос или заказ..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid rgba(0, 51, 102, 0.1)',
                    borderRadius: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#2D3748',
                    background: '#F8F9FA',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '18px 32px',
                  background: 'linear-gradient(135deg, #E30613 0%, #C00000 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(227, 6, 19, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(227, 6, 19, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(227, 6, 19, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Отправить заявку
                <Send size={20} />
              </button>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#718096',
                textAlign: 'center',
                margin: '16px 0 0 0',
              }}>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" style={{ color: '#E30613', textDecoration: 'none' }}>
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Карта */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#2D3748',
            margin: '0 0 24px 0',
          }}>
            Как нас найти
          </h2>
          <div style={{
            background: '#F8F9FA',
            borderRadius: '20px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <MapPin size={48} color="#003366" style={{ opacity: 0.3 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#718096',
              textAlign: 'center',
            }}>
              Карта будет добавлена при подключении Яндекс.Карт<br />
              <strong>{CONTACT_INFO.address}</strong>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactsPage;
