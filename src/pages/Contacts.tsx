/**
 * Страница Contacts — контакты
 * 
 * @description Контактная информация компании «Стеклопром»
 * 
 * ИНСТРУКЦИЯ: Для изменения ссылок на соцсети — измените SOCIAL_LINKS
 */

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { formatPhone, handlePhoneKeyDown } from '@/utils/phoneFormat';
import styles from './Contacts.module.css';

/** Иконка ВКонтакте */
const VKIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.048-2.763-5.339-2.763-5.81 0-.254.102-.488.593-.488h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.661V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.17-3.62 2.17-3.62.119-.254.322-.488.763-.488h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.716-.576.716z"/>
  </svg>
);

/** Иконка WhatsApp */
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/** Иконка Telegram */
const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

/** Иконка VK Max */
const MaxIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.828.94z"/>
  </svg>
);

const SOCIAL_LINKS = {
  vk: 'https://vk.com/stekloprom_rostov',
  whatsapp: 'https://wa.me/78631234567',
  telegram: 'https://t.me/stekloprom_rostov',
  max: 'https://max.me/stekloprom_rostov',
};

const CONTACT_INFO = {
  phone: '+7 (863) 123-45-67',
  phoneHref: 'tel:+78631234567',
  phone2: '+7 (863) 765-43-21',
  phone2Href: 'tel:+78637654321',
  email: 'info@stekloprom-rostov.ru',
  address: 'г. Ростов-на-Дону',
  workHours: {
    weekdays: 'Понедельник — Пятница: 8:00 — 17:00',
    saturday: 'Суббота: 9:00 — 13:00',
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
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00',
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
      <div className={styles.contacts}>
        <Breadcrumbs items={[{ label: 'Контакты' }]} />

        {/* Заголовок */}
        <header className={styles.contacts__header}>
          <h1 className={styles.contacts__title}>Контакты</h1>
          <p className={styles.contacts__subtitle}>
            Свяжитесь с нами любым удобным способом. Мы всегда рады ответить 
            на ваши вопросы и помочь с выбором стеклопакетов.
          </p>
        </header>

        {/* Основной контент */}
        <div className={styles.contacts__content}>
          {/* Форма обратной связи - первая на мобильных */}
          <div className={styles.contacts__form}>
            <h2 className={styles.contacts__formTitle}>Написать нам</h2>
            <p className={styles.contacts__formSubtitle}>
              Заполните форму и мы свяжемся с вами
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.contacts__formGroup}>
                <label htmlFor="name" className={styles.contacts__formLabel}>
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
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="phone" className={styles.contacts__formLabel}>
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
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="email" className={styles.contacts__formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="message" className={styles.contacts__formLabel}>
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваш вопрос или комментарий..."
                  rows={4}
                  className={styles.contacts__formTextarea}
                />
              </div>

              <button type="submit" className={styles.contacts__formButton}>
                <Send size={20} />
                Отправить сообщение
              </button>
            </form>
          </div>

          {/* Контактная информация */}
          <div className={styles.contacts__info}>
            {/* Телефон */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIcon}>
                <Phone size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Телефон</h3>
                <a href={CONTACT_INFO.phoneHref} className={styles.contacts__infoLink}>
                  {CONTACT_INFO.phone}
                </a>
                <p className={styles.contacts__infoNote}>Звоните, мы на связи!</p>
              </div>
            </div>

            {/* Email — цвета Яндекс.Почты */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconEmail}>
                <Mail size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Email</h3>
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contacts__infoLinkSecondary}>
                  {CONTACT_INFO.email}
                </a>
                <p className={styles.contacts__infoNote}>Ответим быстро и оперативно</p>
              </div>
            </div>

            {/* Адрес — цвета Яндекс.Карт */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconAddress}>
                <MapPin size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Адрес</h3>
                <p className={styles.contacts__infoText}>{CONTACT_INFO.address}</p>
                <p className={styles.contacts__infoNote}>Производство и офис</p>
              </div>
            </div>

            {/* Режим работы — стилистика сайта */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconSchedule}>
                <Clock size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Режим работы</h3>
                <ul className={styles.contacts__workHours}>
                  <li>{CONTACT_INFO.workHours.weekdays}</li>
                  <li>{CONTACT_INFO.workHours.saturday}</li>
                  <li className={styles.contacts__workHoursOff}>{CONTACT_INFO.workHours.sunday}</li>
                </ul>
              </div>
            </div>

            {/* Мы в соцсетях */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Мы в соцсетях</h3>
                <div className={styles.contacts__socialLinks}>
                  <a href={SOCIAL_LINKS.vk} target="_blank" rel="noopener noreferrer" className={styles.contacts__socialLink} aria-label="ВКонтакте">
                    <VKIcon size={24} />
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.contacts__socialLink} aria-label="WhatsApp">
                    <WhatsAppIcon size={24} />
                  </a>
                  <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className={styles.contacts__socialLink} aria-label="Telegram">
                    <TelegramIcon size={24} />
                  </a>
                  <a href={SOCIAL_LINKS.max} target="_blank" rel="noopener noreferrer" className={styles.contacts__socialLink} aria-label="VK Max">
                    <MaxIcon size={24} />
                  </a>
                </div>
                <p className={styles.contacts__infoNote}>Следите за новостями</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;