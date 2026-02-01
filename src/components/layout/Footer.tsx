/**
 * Компонент Footer — подвал сайта
 * 
 * @description Контактная информация, ссылки и копирайт
 * Использует БЭМ-методологию для именования классов
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * - Контакты: измените CONTACT_INFO
 * - Ссылки: измените FOOTER_LINKS
 */

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import styles from './Footer.module.css';

/**
 * Контактная информация
 */
const CONTACT_INFO = {
  phone: '+7 (863) 123-45-67',
  phoneHref: 'tel:+78631234567',
  email: 'info@stekloprom-rostov.ru',
  address: 'г. Ростов-на-Дону, ул. Промышленная, 15',
  workHours: 'Пн-Пт: 8:00-18:00, Сб: 9:00-15:00',
};

/**
 * Ссылки подвала
 */
const FOOTER_LINKS = {
  products: {
    title: 'Каталог',
    items: [
      { label: 'Однокамерные', href: '/catalog/odnokamernye' },
      { label: 'Двухкамерные', href: '/catalog/dvuhkamernye' },
      { label: 'Энергосберегающие', href: '/catalog/energosberegayushchie' },
      { label: 'Шумоизоляционные', href: '/catalog/shumoizolyatsionnye' },
      { label: 'Мультифункциональные', href: '/catalog/multifunktsionalnye' },
      { label: 'Солнцезащитные', href: '/catalog/solntsezashchitnye' },
      { label: 'Ударопрочные', href: '/catalog/udaroprochnye' },
      { label: 'Тонированные', href: '/catalog/tonirovannye' },
      { label: 'С закаленным стеклом', href: '/catalog/zakalennye' },
      { label: 'С триплексом', href: '/catalog/tripleks' },
      { label: 'Теплосберегающие', href: '/catalog/teplosberegayushchie' },
      { label: 'Зеркальные', href: '/catalog/zerkalnye' },
      { label: 'Нестандартные', href: '/catalog/nestandartnye' },
      { label: 'С газонаполнением', href: '/catalog/gazonapolnennye' },
    ],
  },
  company: {
    title: 'Компания',
    items: [
      { label: 'О компании', href: '/about' },
      { label: 'Наши работы', href: '/cases' },
      { label: 'Блог', href: '/blog' },
      { label: 'Услуги', href: '/services' },
      { label: 'Контакты', href: '/contacts' },
    ],
  },
};

/**
 * Компонент Footer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Основной контент */}
      <div className={styles.footer__main}>
        <div className={styles.footer__container}>
          <div className={styles.footer__grid}>
            {/* Колонка с логотипом и контактами */}
            <div className={styles.footer__brand}>
              <Link to="/" className={styles.footer__logo}>
                <img 
                  src="/images/logo.png" 
                  alt="Стеклопром" 
                  className={styles.footer__logoImage}
                />
              </Link>
              
              <p className={styles.footer__description}>
                Производство качественных стеклопакетов в Ростове-на-Дону с 2008 года. 
                Современное оборудование, опытная команда и гарантия 5 лет.
              </p>

              <ul className={styles.footer__contacts}>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Phone size={16} />
                  </div>
                  <a href={CONTACT_INFO.phoneHref} className={styles.footer__contactLink}>
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className={styles.footer__contactLink}>
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <MapPin size={16} />
                  </div>
                  <span className={styles.footer__contactText}>
                    {CONTACT_INFO.address}
                  </span>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Clock size={16} />
                  </div>
                  <span className={styles.footer__contactText}>
                    {CONTACT_INFO.workHours}
                  </span>
                </li>
              </ul>
            </div>

            {/* Колонка продуктов */}
            <nav className={styles.footer__nav}>
              <h3 className={styles.footer__navTitle}>{FOOTER_LINKS.products.title}</h3>
              <ul className={styles.footer__navList}>
                {FOOTER_LINKS.products.items.map((link) => (
                  <li key={link.href} className={styles.footer__navItem}>
                    <Link to={link.href} className={styles.footer__navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Колонка компании */}
            <nav className={styles.footer__nav}>
              <h3 className={styles.footer__navTitle}>{FOOTER_LINKS.company.title}</h3>
              <ul className={styles.footer__navList}>
                {FOOTER_LINKS.company.items.map((link) => (
                  <li key={link.href} className={styles.footer__navItem}>
                    <Link to={link.href} className={styles.footer__navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottomContainer}>
          <p className={styles.footer__copyright}>
            © {currentYear} Стеклопром. Все права защищены.
          </p>
          <div className={styles.footer__legal}>
            <Link to="/privacy" className={styles.footer__legalLink}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
