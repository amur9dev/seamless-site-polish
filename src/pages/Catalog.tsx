/**
 * Страница Catalog — каталог продукции
 * 
 * @description Каталог всех типов стеклопакетов с детальными страницами
 * SEO: Основные ключи — стеклопакеты Ростов-на-Дону, виды стеклопакетов, каталог стеклопакетов
 */

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Thermometer, Volume2, Sun, Shield, Home, Building2, Warehouse, Layers, Square, Snowflake, Palette, Lock, Zap } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { generateProductSchema } from '@/utils/seo';
import styles from './Catalog.module.css';

/**
 * Полный каталог стеклопакетов
 */
const PRODUCTS = [
  {
    slug: 'odnokamernye',
    title: 'Однокамерные',
    fullTitle: 'Однокамерные стеклопакеты',
    description: 'Экономичное решение для нежилых помещений, балконов и лоджий в Ростове-на-Дону. Оптимальный выбор для регионов с мягким климатом.',
    fullDescription: 'Однокамерный стеклопакет состоит из двух стёкол и одной воздушной камеры между ними. Это классическое и экономичное решение, которое обеспечивает базовую тепло- и шумоизоляцию. Идеально подходит для остекления балконов, лоджий, нежилых помещений, а также для южных регионов с мягким климатом.',
    features: ['Толщина 24 мм', 'Формула 4-16-4', 'Базовая изоляция'],
    price: 'от 1 200',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Square,
    advantages: [
      { icon: Zap, title: 'Доступная цена', text: 'Самый экономичный вариант' },
      { icon: Layers, title: 'Лёгкий вес', text: 'Меньшая нагрузка на раму' },
      { icon: Sun, title: 'Хорошее светопропускание', text: 'До 80% света' },
      { icon: Shield, title: 'Надёжность', text: 'Проверенная конструкция' },
    ],
    specs: [
      ['Количество камер', '1'],
      ['Толщина стеклопакета', '24 мм'],
      ['Формула', '4-16-4 мм'],
      ['Коэффициент теплопередачи', '2.8 Вт/(м²·К)'],
      ['Звукоизоляция', '25 дБ'],
      ['Светопропускание', '80%'],
    ],
    forWhom: [
      { icon: Home, title: 'Балконы и лоджии', text: 'Холодное остекление' },
      { icon: Warehouse, title: 'Нежилые помещения', text: 'Склады, гаражи' },
      { icon: Building2, title: 'Южные регионы', text: 'Мягкий климат' },
    ],
    prices: [
      { title: 'Стандартный', formula: '4-16-4', price: '1 200', popular: false },
      { title: 'Улучшенный', formula: '4-18-4', price: '1 400', popular: true },
      { title: 'Премиум', formula: '6-16-4', price: '1 600', popular: false },
    ],
  },
  {
    slug: 'dvuhkamernye',
    title: 'Двухкамерные',
    fullTitle: 'Двухкамерные стеклопакеты',
    description: 'Оптимальный выбор для жилых помещений в Ростове-на-Дону с улучшенной тепло- и шумоизоляцией.',
    fullDescription: 'Двухкамерный стеклопакет — это три стекла и две воздушные камеры между ними. Такая конструкция обеспечивает значительно лучшую теплоизоляцию и шумоподавление по сравнению с однокамерным вариантом. Это самый популярный выбор для остекления жилых помещений в средней полосе России.',
    features: ['Толщина 32-40 мм', 'Формула 4-10-4-10-4', 'Улучшенная изоляция'],
    price: 'от 1 800',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Layers,
    advantages: [
      { icon: Thermometer, title: 'Теплоизоляция', text: 'На 30% теплее однокамерных' },
      { icon: Volume2, title: 'Шумоизоляция', text: 'До 32 дБ' },
      { icon: Shield, title: 'Долговечность', text: 'Срок службы 20+ лет' },
      { icon: Zap, title: 'Универсальность', text: 'Подходит для любых окон' },
    ],
    specs: [
      ['Количество камер', '2'],
      ['Толщина стеклопакета', '32-40 мм'],
      ['Формула', '4-10-4-10-4 мм'],
      ['Коэффициент теплопередачи', '1.9 Вт/(м²·К)'],
      ['Звукоизоляция', '32 дБ'],
      ['Светопропускание', '72%'],
    ],
    forWhom: [
      { icon: Home, title: 'Квартиры', text: 'Жилые помещения' },
      { icon: Building2, title: 'Офисы', text: 'Коммерческая недвижимость' },
      { icon: Warehouse, title: 'Коттеджи', text: 'Загородные дома' },
    ],
    prices: [
      { title: 'Стандартный', formula: '4-10-4-10-4', price: '1 800', popular: false },
      { title: 'Оптимальный', formula: '4-12-4-12-4', price: '2 100', popular: true },
      { title: 'Расширенный', formula: '4-16-4-16-4', price: '2 400', popular: false },
    ],
  },
  {
    slug: 'energosberegayushchie',
    title: 'Энергосберегающие',
    fullTitle: 'Энергосберегающие стеклопакеты',
    description: 'I-стекло с напылением серебра сохраняет тепло зимой и снижает расходы на отопление до 40%.',
    fullDescription: 'Энергосберегающий стеклопакет оснащён специальным I-стеклом с напылением оксидов металлов. Это покрытие отражает тепловое излучение обратно в помещение, сохраняя до 40% тепла. Заполнение камер аргоном дополнительно повышает теплоизоляционные свойства.',
    features: ['I-стекло с напылением', 'Заполнение аргоном', 'Экономия до 40%'],
    price: 'от 2 400',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Thermometer,
    advantages: [
      { icon: Thermometer, title: 'Экономия тепла', text: 'До 40% меньше теплопотерь' },
      { icon: Zap, title: 'Снижение счетов', text: 'Экономия на отоплении' },
      { icon: Sun, title: 'Прозрачность', text: 'Не влияет на освещение' },
      { icon: Snowflake, title: 'Без конденсата', text: 'Тёплое стекло внутри' },
    ],
    specs: [
      ['Тип стекла', 'I-стекло (Low-E)'],
      ['Толщина стеклопакета', '32-40 мм'],
      ['Заполнение камер', 'Аргон'],
      ['Коэффициент теплопередачи', '1.0-1.3 Вт/(м²·К)'],
      ['Звукоизоляция', '32 дБ'],
      ['Экономия тепла', 'до 40%'],
    ],
    forWhom: [
      { icon: Home, title: 'Жилые дома', text: 'Экономия на отоплении' },
      { icon: Building2, title: 'Офисы', text: 'Снижение расходов' },
      { icon: Snowflake, title: 'Холодные регионы', text: 'Суровый климат' },
    ],
    prices: [
      { title: 'Однокамерный', formula: '4-16-4i', price: '2 400', popular: false },
      { title: 'Двухкамерный', formula: '4-10-4-10-4i', price: '2 800', popular: true },
      { title: 'С аргоном', formula: '4-16Ar-4i', price: '3 200', popular: false },
    ],
  },
  {
    slug: 'shumoizolyatsionnye',
    title: 'Шумоизоляционные',
    fullTitle: 'Шумоизоляционные стеклопакеты',
    description: 'Максимальная защита от уличного шума до 42 дБ для комфортного сна и работы.',
    fullDescription: 'Шумоизоляционные стеклопакеты используют стёкла разной толщины и специальные триплекс-конструкции для максимального гашения звуковых волн. Идеальное решение для квартир на оживлённых улицах, вблизи аэропортов или железных дорог.',
    features: ['Триплекс', 'До 42 дБ изоляции', 'Разная толщина стёкол'],
    price: 'от 2 800',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Volume2,
    advantages: [
      { icon: Volume2, title: 'Тишина', text: 'Снижение шума до 42 дБ' },
      { icon: Shield, title: 'Безопасность', text: 'Триплекс не рассыпается' },
      { icon: Thermometer, title: 'Теплоизоляция', text: 'Дополнительное утепление' },
      { icon: Lock, title: 'Защита', text: 'Сложнее разбить' },
    ],
    specs: [
      ['Тип конструкции', 'Асимметричная'],
      ['Толщина стеклопакета', '36-44 мм'],
      ['Формула', '6-14-4-14-6т'],
      ['Звукоизоляция', 'до 42 дБ'],
      ['Тип стекла', 'Триплекс (опционально)'],
      ['Коэффициент теплопередачи', '1.8 Вт/(м²·К)'],
    ],
    forWhom: [
      { icon: Home, title: 'Оживлённые улицы', text: 'Центр города' },
      { icon: Building2, title: 'Рядом с дорогой', text: 'Трассы, магистрали' },
      { icon: Warehouse, title: 'Аэропорты', text: 'Шумные зоны' },
    ],
    prices: [
      { title: 'Базовый', formula: '6-12-4-12-4', price: '2 800', popular: false },
      { title: 'Усиленный', formula: '6-14-4-14-6', price: '3 400', popular: true },
      { title: 'Триплекс', formula: '6т-12-4-12-6т', price: '4 200', popular: false },
    ],
  },
  {
    slug: 'multifunktsionalnye',
    title: 'Мультифункциональные',
    fullTitle: 'Мультифункциональные стеклопакеты',
    description: 'Сочетание энергосбережения, защиты от солнца и шумоизоляции в одном стеклопакете.',
    fullDescription: 'Мультифункциональные стеклопакеты — это премиальное решение, объединяющее все преимущества: энергосбережение зимой, защиту от перегрева летом, отличную шумоизоляцию и защиту от УФ-излучения. Идеальный выбор для тех, кто ценит комфорт.',
    features: ['Защита от УФ до 99%', 'Защита от жары', 'Энергосбережение'],
    price: 'от 3 600',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Sun,
    advantages: [
      { icon: Sun, title: 'Защита от солнца', text: 'Отражает до 60% тепла' },
      { icon: Thermometer, title: 'Сохранение тепла', text: 'Зимой тепло внутри' },
      { icon: Palette, title: 'Защита от УФ', text: 'До 99% УФ-лучей' },
      { icon: Volume2, title: 'Шумоизоляция', text: 'До 35 дБ' },
    ],
    specs: [
      ['Тип стекла', 'Мультифункциональное'],
      ['Толщина стеклопакета', '32-44 мм'],
      ['Отражение солнечного тепла', 'до 60%'],
      ['Защита от УФ', 'до 99%'],
      ['Звукоизоляция', '35 дБ'],
      ['Коэффициент теплопередачи', '1.1 Вт/(м²·К)'],
    ],
    forWhom: [
      { icon: Sun, title: 'Солнечная сторона', text: 'Южные окна' },
      { icon: Home, title: 'Премиум-жильё', text: 'Максимальный комфорт' },
      { icon: Building2, title: 'Панорамные окна', text: 'Большая площадь' },
    ],
    prices: [
      { title: 'Базовый', formula: '4MF-16-4', price: '3 600', popular: false },
      { title: 'Двухкамерный', formula: '4MF-12-4-12-4i', price: '4 400', popular: true },
      { title: 'Премиум', formula: '6MF-14-4-14-4i', price: '5 200', popular: false },
    ],
  },
  {
    slug: 'solntsezashchitnye',
    title: 'Солнцезащитные',
    fullTitle: 'Солнцезащитные стеклопакеты',
    description: 'Тонированные и рефлективные стеклопакеты для защиты от яркого солнца.',
    fullDescription: 'Солнцезащитные стеклопакеты снижают проникновение солнечного света и тепла в помещение. Используются тонированные или рефлективные (зеркальные) стёкла различных оттенков. Отличное решение для офисов, витрин и жилых помещений на солнечной стороне.',
    features: ['Тонировка бронза/серый', 'Зеркальное покрытие', 'Защита от бликов'],
    price: 'от 2 600',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Sun,
    advantages: [
      { icon: Sun, title: 'Защита от солнца', text: 'Снижение яркости' },
      { icon: Thermometer, title: 'Прохлада', text: 'Меньше нагрев летом' },
      { icon: Palette, title: 'Эстетика', text: 'Стильный внешний вид' },
      { icon: Lock, title: 'Приватность', text: 'Зеркальный эффект' },
    ],
    specs: [
      ['Тип стекла', 'Тонированное/рефлективное'],
      ['Толщина', '24-40 мм'],
      ['Светопропускание', '30-60%'],
      ['Отражение тепла', 'до 50%'],
      ['Цвета', 'Бронза, серый, синий'],
      ['Зеркальный эффект', 'Опционально'],
    ],
    forWhom: [
      { icon: Building2, title: 'Офисы', text: 'Защита от бликов' },
      { icon: Sun, title: 'Южные окна', text: 'Солнечная сторона' },
      { icon: Lock, title: 'Первые этажи', text: 'Приватность' },
    ],
    prices: [
      { title: 'Тонировка', formula: '4тон-16-4', price: '2 600', popular: false },
      { title: 'Рефлективное', formula: '4реф-16-4', price: '3 200', popular: true },
      { title: 'Премиум', formula: '6реф-12-4-12-4', price: '4 000', popular: false },
    ],
  },
  {
    slug: 'udaroprochnye',
    title: 'Ударопрочные',
    fullTitle: 'Ударопрочные стеклопакеты',
    description: 'Закалённое стекло и триплекс для максимальной защиты и безопасности.',
    fullDescription: 'Ударопрочные стеклопакеты изготавливаются из закалённого стекла (в 5 раз прочнее обычного) или триплекса (ламинированного стекла). При разбивании закалённое стекло рассыпается на безопасные кусочки, а триплекс удерживается на плёнке.',
    features: ['Закалённое стекло', 'Триплекс', 'Антивандальная защита'],
    price: 'от 3 200',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Shield,
    advantages: [
      { icon: Shield, title: 'Прочность', text: 'В 5-7 раз прочнее' },
      { icon: Lock, title: 'Безопасность', text: 'Защита от взлома' },
      { icon: Home, title: 'Для детей', text: 'Безопасное разбивание' },
      { icon: Thermometer, title: 'Термостойкость', text: 'Выдерживает перепады' },
    ],
    specs: [
      ['Тип стекла', 'Закалённое/триплекс'],
      ['Прочность', 'В 5-7 раз выше'],
      ['Толщина', '32-44 мм'],
      ['Класс защиты', 'А1-А3'],
      ['Термостойкость', 'До 250°C'],
      ['Безопасность', 'Сертифицировано'],
    ],
    forWhom: [
      { icon: Home, title: 'Семьи с детьми', text: 'Безопасность' },
      { icon: Building2, title: 'Первые этажи', text: 'Защита от взлома' },
      { icon: Warehouse, title: 'Коммерция', text: 'Витрины, входные группы' },
    ],
    prices: [
      { title: 'Закалённое', formula: '4зак-16-4', price: '3 200', popular: false },
      { title: 'Триплекс', formula: '4.4.1-16-4', price: '3 800', popular: true },
      { title: 'Усиленный', formula: '6.6.1-12-4-12-4', price: '5 000', popular: false },
    ],
  },
  {
    slug: 'matovye',
    title: 'Матовые',
    fullTitle: 'Матовые стеклопакеты',
    description: 'Непрозрачные стеклопакеты для ванных комнат, санузлов и приватных помещений.',
    fullDescription: 'Матовые стеклопакеты обеспечивают приватность, пропуская свет, но скрывая обзор. Используются для ванных комнат, туалетов, лестничных клеток и других помещений, где требуется естественное освещение без просматриваемости.',
    features: ['Сатинато', 'Пескоструйная обработка', 'Полная приватность'],
    price: 'от 2 400',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: Palette,
    advantages: [
      { icon: Lock, title: 'Приватность', text: '100% непрозрачность' },
      { icon: Sun, title: 'Светопропускание', text: 'Естественное освещение' },
      { icon: Palette, title: 'Эстетика', text: 'Современный дизайн' },
      { icon: Shield, title: 'Практичность', text: 'Скрывает загрязнения' },
    ],
    specs: [
      ['Тип обработки', 'Сатинато/пескоструй'],
      ['Светопропускание', '60-70%'],
      ['Просматриваемость', '0%'],
      ['Толщина', '24-40 мм'],
      ['Очистка', 'Стандартная'],
      ['Рисунок', 'Опционально'],
    ],
    forWhom: [
      { icon: Home, title: 'Ванные', text: 'Санузлы' },
      { icon: Building2, title: 'Офисы', text: 'Переговорные' },
      { icon: Warehouse, title: 'Лестницы', text: 'Подъезды' },
    ],
    prices: [
      { title: 'Сатинато', formula: '4сат-16-4', price: '2 400', popular: true },
      { title: 'Пескоструй', formula: '4пс-16-4', price: '2 800', popular: false },
      { title: 'Двухкамерный', formula: '4сат-10-4-10-4', price: '3 200', popular: false },
    ],
  },
];

/**
 * Компонент CatalogPage
 */
const CatalogPage = () => {
  const { productType } = useParams<{ productType: string }>();
  const { setMeta } = useSeoMeta();

  // Находим текущий продукт
  const currentProduct = productType 
    ? PRODUCTS.find(p => p.slug === productType)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productType]);

  useEffect(() => {
    if (currentProduct) {
      setMeta({
        title: `${currentProduct.fullTitle} в Ростове-на-Дону — цены ${currentProduct.price} ₽/м²`,
        description: `${currentProduct.description} Цены ${currentProduct.price} ₽/м². Производство за 1 час, доставка за 2 часа. Гарантия 5 лет. ☎ +7 (863) 123-45-67`,
        keywords: `${currentProduct.title.toLowerCase()} стеклопакеты, ${currentProduct.fullTitle.toLowerCase()}, стеклопакеты Ростов-на-Дону, купить ${currentProduct.title.toLowerCase()}`,
      });

      // Добавляем структурированные данные для продукта
      const productSchema = generateProductSchema({
        name: `${currentProduct.fullTitle} — Стеклопром Ростов-на-Дону`,
        description: currentProduct.fullDescription,
        image: currentProduct.image,
        sku: currentProduct.slug.toUpperCase(),
        brand: 'Стеклопром',
        offers: {
          price: parseInt(currentProduct.price.replace(/\D/g, '')),
          priceCurrency: 'RUB',
          availability: 'InStock',
        },
      });

      const existingScript = document.querySelector('script[data-product-schema]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-product-schema', 'true');
      script.textContent = productSchema;
      document.head.appendChild(script);

      return () => {
        const productScript = document.querySelector('script[data-product-schema]');
        if (productScript) productScript.remove();
      };
    } else {
      setMeta({
        title: 'Каталог стеклопакетов в Ростове-на-Дону — все виды, цены от 1 200 ₽/м²',
        description: 'Полный каталог стеклопакетов от производителя в Ростове-на-Дону. Однокамерные, двухкамерные, энергосберегающие, шумоизоляционные, мультифункциональные. Цены от 1 200 ₽/м². Изготовление за 1 час. ☎ +7 (863) 123-45-67',
        keywords: 'каталог стеклопакетов Ростов, виды стеклопакетов, купить стеклопакеты Ростов-на-Дону, цены на стеклопакеты, энергосберегающие стеклопакеты',
      });
    }
  }, [setMeta, currentProduct]);

  // Хлебные крошки
  const breadcrumbs = currentProduct
    ? [
        { label: 'Каталог', href: '/catalog' },
        { label: currentProduct.title },
      ]
    : [{ label: 'Каталог' }];

  if (currentProduct) {
    // Детальная страница продукта
    return (
      <Layout withPadding>
        <div className={styles.catalog__container}>
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <section className={styles.catalogDetail}>
          <div className={styles.catalog__container}>
            {/* Основная информация */}
            <div className={styles.catalogDetail__grid}>
              <img
                src={currentProduct.image}
                alt={`${currentProduct.fullTitle} — производство в Ростове-на-Дону`}
                className={styles.catalogDetail__image}
              />
              <div className={styles.catalogDetail__info}>
                <h1 className={styles.catalogDetail__title}>
                  {currentProduct.fullTitle}
                </h1>
                <p className={styles.catalogDetail__description}>
                  {currentProduct.fullDescription}
                </p>
                <div className={styles.catalogDetail__price}>
                  {currentProduct.price} <span className={styles.catalogDetail__priceLabel}>₽/м²</span>
                </div>
                <button className={styles.catalogDetail__button}>
                  Рассчитать стоимость
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Преимущества */}
            <div className={styles.catalogDetail__advantages}>
              <h2 className={styles.catalogDetail__sectionTitle}>
                Преимущества
              </h2>
              <div className={styles.catalogDetail__advantagesGrid}>
                {currentProduct.advantages.map((adv, index) => (
                  <div key={index} className={styles.catalogDetail__advantage}>
                    <div className={styles.catalogDetail__advantageIcon}>
                      <adv.icon size={26} />
                    </div>
                    <h3 className={styles.catalogDetail__advantageTitle}>
                      {adv.title}
                    </h3>
                    <p className={styles.catalogDetail__advantageText}>
                      {adv.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Характеристики */}
            <div className={styles.catalogDetail__specs}>
              <h2 className={styles.catalogDetail__sectionTitle}>
                Технические характеристики
              </h2>
              <table className={styles.catalogDetail__table}>
                <tbody>
                  {currentProduct.specs.map(([key, value], index) => (
                    <tr key={index} className={styles.catalogDetail__tableRow}>
                      <td className={styles.catalogDetail__tableCell}>{key}</td>
                      <td className={styles.catalogDetail__tableCell}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Для кого */}
            <div className={styles.catalogDetail__forWhom}>
              <h2 className={styles.catalogDetail__sectionTitle}>
                Для кого подходит
              </h2>
              <div className={styles.catalogDetail__forWhomGrid}>
                {currentProduct.forWhom.map((item, index) => (
                  <div key={index} className={styles.catalogDetail__forWhomCard}>
                    <div className={styles.catalogDetail__forWhomIcon}>
                      <item.icon size={32} />
                    </div>
                    <h3 className={styles.catalogDetail__forWhomTitle}>
                      {item.title}
                    </h3>
                    <p className={styles.catalogDetail__forWhomText}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Цены */}
            <div className={styles.catalogDetail__prices}>
              <h2 className={styles.catalogDetail__sectionTitle}>
                Цены на {currentProduct.title.toLowerCase()} стеклопакеты
              </h2>
              <div className={styles.catalogDetail__pricesGrid}>
                {currentProduct.prices.map((price, index) => (
                  <div 
                    key={index} 
                    className={`${styles.catalogDetail__priceCard} ${
                      price.popular ? styles['catalogDetail__priceCard--popular'] : ''
                    }`}
                  >
                    <h3 className={styles.catalogDetail__priceCardTitle}>
                      {price.title}
                    </h3>
                    <p className={styles.catalogDetail__priceCardFormula}>
                      Формула: {price.formula}
                    </p>
                    <div className={styles.catalogDetail__priceCardValue}>
                      {price.price} <span className={styles.catalogDetail__priceCardUnit}>₽/м²</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </Layout>
    );
  }

  // Список продуктов
  return (
    <Layout withPadding>
      <div className={styles.catalog}>
        <div className={styles.catalog__container}>
          <Breadcrumbs items={breadcrumbs} />

          <header className={styles.catalog__header}>
            <h1 className={styles.catalog__title}>
              Каталог стеклопакетов
            </h1>
            <p className={styles.catalog__description}>
              Полный ассортимент стеклопакетов от производителя в Ростове-на-Дону. 
              Изготовление за 1 час, доставка за 2 часа. Гарантия 5 лет.
            </p>
          </header>

          <div className={styles.catalog__grid}>
            {PRODUCTS.map((product) => (
              <Link 
                key={product.slug} 
                to={`/catalog/${product.slug}`} 
                className={styles.catalog__cardLink}
              >
                <article className={styles.catalog__card}>
                  <img
                    src={product.image}
                    alt={`${product.fullTitle} — купить в Ростове-на-Дону`}
                    className={styles.catalog__cardImage}
                  />
                  <div className={styles.catalog__cardContent}>
                    <h2 className={styles.catalog__cardTitle}>
                      {product.title}
                    </h2>
                    <p className={styles.catalog__cardDescription}>
                      {product.description}
                    </p>
                    <ul className={styles.catalog__cardFeatures}>
                      {product.features.map((feature, i) => (
                        <li key={i} className={styles.catalog__cardFeature}>
                          <span className={styles.catalog__cardFeatureDot} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.catalog__cardPrice}>
                      {product.price} <span className={styles.catalog__cardPriceLabel}>₽/м²</span>
                    </div>
                    <span className={styles.catalog__cardButton}>
                      Подробнее
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ContactForm />
    </Layout>
  );
};

export default CatalogPage;
