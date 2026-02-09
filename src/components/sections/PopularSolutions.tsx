/**
 * Секция PopularSolutions — популярные решения
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PopularSolutions.module.css';

const PRODUCTS = [
  {
    id: 'odnokamernye',
    images: ['/placeholder.svg', '/placeholder.svg'],
    title: 'Однокамерные',
    description: 'Экономичный вариант для остекления балконов, лоджий и нежилых помещений. Лёгкая конструкция с хорошей светопропускаемостью',
    features: ['Толщина 24 мм', 'Формула 4-16-4', 'Лёгкий вес'],
    price: 'от 1 200',
    href: '/catalog/odnokamernye',
    popular: false,
  },
  {
    id: 'dvuhkamernye',
    images: ['/placeholder.svg', '/placeholder.svg'],
    title: 'Двухкамерные',
    description: 'Оптимальный выбор для жилых помещений с отличной тепло- и шумоизоляцией. Надёжный и проверенный вариант',
    features: ['Толщина 32-40 мм', 'Формула 4-12-4-12-4', 'Улучшенная изоляция'],
    price: 'от 1 800',
    href: '/catalog/dvuhkamernye',
    popular: false,
  },
  {
    id: 'multifunktsionalnye',
    images: ['/placeholder.svg', '/placeholder.svg'],
    title: 'Мультифункциональные',
    description: 'Сочетание энергосбережения, защиты от солнца и шумоизоляции в одном стеклопакете. Премиальное решение',
    features: ['Защита от УФ до 99%', 'Защита от жары', 'Энергосбережение'],
    price: 'от 3 600',
    href: '/catalog/multifunktsionalnye',
    popular: true,
  },
  {
    id: 'energosberegayushchie',
    images: ['/placeholder.svg', '/placeholder.svg'],
    title: 'Энергосберегающие',
    description: 'Экономия на отоплении до 40% за счёт специального I-покрытия. Сохраняет тепло зимой и прохладу летом',
    features: ['I-стекло Low-E', 'Заполнение аргоном', 'Экономия до 40%'],
    price: 'от 2 400',
    href: '/catalog/energosberegayushchie',
    popular: false,
  },
];

/** Мини-слайдер для изображений карточки с поддержкой свайпов */
const CardImageSlider = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useState<number | null>(null);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX[1](e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX[0] === null) return;
    const diff = touchStartX[0] - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      } else {
        setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
      }
    }
    touchStartX[1](null);
  };

  return (
    <div
      className={styles.solutions__cardImageWrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[current]}
        alt={`${alt} — фото ${current + 1}`}
        className={styles.solutions__cardImage}
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button className={`${styles.solutions__sliderArrow} ${styles['solutions__sliderArrow--prev']}`} onClick={prev} aria-label="Предыдущее фото">
            <ChevronLeft size={16} />
          </button>
          <button className={`${styles.solutions__sliderArrow} ${styles['solutions__sliderArrow--next']}`} onClick={next} aria-label="Следующее фото">
            <ChevronRight size={16} />
          </button>
          <div className={styles.solutions__sliderDots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.solutions__sliderDot} ${i === current ? styles['solutions__sliderDot--active'] : ''}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PopularSolutions = () => {
  return (
    <section className={styles.solutions}>
      <div className={styles.solutions__container}>
        <div className={styles.solutions__header}>
          <h2 className={styles.solutions__title}>Популярные решения</h2>
          <p className={styles.solutions__subtitle}>
            Выберите оптимальный тип стеклопакета для ваших задач. 
            Мы поможем подобрать идеальное решение.
          </p>
        </div>

        <div className={styles.solutions__grid}>
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className={`${styles.solutions__card} ${product.popular ? styles['solutions__card--popular'] : ''}`}
            >
              {product.popular && (
                <div className={styles.solutions__cardBadge}>Популярный</div>
              )}

              <CardImageSlider images={product.images} alt={product.title} />

              <h3 className={styles.solutions__cardTitle}>{product.title}</h3>
              <p className={styles.solutions__cardDescription}>{product.description}</p>

              <ul className={styles.solutions__cardFeatures}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.solutions__cardFeature}>
                    <span className={styles.solutions__cardFeatureDot} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.solutions__cardPrice}>
                {product.price} <span className={styles.solutions__cardPriceLabel}>₽/м²</span>
              </div>

              <Link to={product.href} className={styles.solutions__cardButton}>
                Подробнее
                <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.solutions__footer}>
          <Link to="/catalog" className={styles.solutions__allButton}>
            Смотреть весь каталог
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSolutions;
