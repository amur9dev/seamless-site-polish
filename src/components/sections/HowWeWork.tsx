/**
 * Секция HowWeWork — этапы работы
 * 
 * @description 5 этапов работы с клиентом с мобильным слайдером
 */

import { useState, useEffect, useRef } from 'react';
import { Phone, Ruler, Factory, Truck, CheckCircle } from 'lucide-react';
import styles from './HowWeWork.module.css';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Этапы работы
 */
const STEPS = [
  {
    number: 1,
    icon: Phone,
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните нам',
  },
  {
    number: 2,
    icon: Ruler,
    title: 'Замер',
    description: 'Бесплатный выезд замерщика в удобное время',
  },
  {
    number: 3,
    icon: Factory,
    title: 'Производство',
    description: 'Изготовление стеклопакетов на современном оборудовании',
  },
  {
    number: 4,
    icon: Truck,
    title: 'Доставка',
    description: 'Бережная доставка по Ростову-на-Дону и области',
  },
  {
    number: 5,
    icon: CheckCircle,
    title: 'Готово',
    description: 'Приёмка заказа и гарантия 5 лет',
  },
];

/**
 * Компонент HowWeWork
 */
const HowWeWork = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Автопрокрутка для мобильного слайдера — ускоренная до 2с
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Плавная прокрутка слайдера при изменении текущего слайда
  useEffect(() => {
    if (!isMobile || !sliderRef.current) return;
    
    const slideWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: currentSlide * slideWidth,
      behavior: 'smooth',
    });
  }, [currentSlide, isMobile]);

  return (
    <section className={styles.howwework}>
      <div className={styles.howwework__container}>
        {/* Заголовок */}
        <header className={styles.howwework__header}>
          <h2 className={styles.howwework__title}>
            Как мы работаем
          </h2>
          <p className={styles.howwework__subtitle}>
            От заявки до готового стеклопакета — всего 5 простых шагов. 
            Мы ценим ваше время.
          </p>
        </header>

        {/* Десктопные этапы */}
        {!isMobile && (
          <div className={styles.howwework__steps}>
            {STEPS.map((step) => (
              <div key={step.number} className={styles.howwework__step}>
                <div className={styles.howwework__stepNumber}>
                  {step.number}
                </div>
                <div className={styles.howwework__stepIcon}>
                  <step.icon size={24} />
                </div>
                <h3 className={styles.howwework__stepTitle}>
                  {step.title}
                </h3>
                <p className={styles.howwework__stepDescription}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Мобильный слайдер */}
        {isMobile && (
          <>
            <div className={styles.howwework__slider} ref={sliderRef}>
              <div className={styles.howwework__sliderTrack}>
                {STEPS.map((step) => (
                  <div key={step.number} className={styles.howwework__slide}>
                    <div className={styles.howwework__stepNumber}>
                      {step.number}
                    </div>
                    <div className={styles.howwework__stepIcon}>
                      <step.icon size={24} />
                    </div>
                    <h3 className={styles.howwework__stepTitle}>
                      {step.title}
                    </h3>
                    <p className={styles.howwework__stepDescription}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Индикаторы */}
            <div className={styles.howwework__dots}>
              {STEPS.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.howwework__dot} ${index === currentSlide ? styles['howwework__dot--active'] : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Этап ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HowWeWork;