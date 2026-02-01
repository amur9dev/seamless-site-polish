/**
 * Страница Services — услуги компании
 * 
 * @description Полное описание услуг компании «Стеклопром»
 */

import { useEffect, useState } from 'react';
import { Factory, Truck, Shield, Ruler, Phone, Check, ArrowRight } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import Modal from '@/components/ui/Modal';
import CallbackForm from '@/components/ui/CallbackForm';

/**
 * Основные услуги
 */
const MAIN_SERVICES = [
  {
    id: 'production',
    icon: Factory,
    title: 'Изготовление стеклопакетов',
    description: 'Производство стеклопакетов любой сложности. Однокамерные, двухкамерные, мультифункциональные, шумоизоляционные, энергосберегающие и другие виды.',
    features: [
      'Изготовление стандартных стеклопакетов за 1 час',
      'Нестандартные формы и размеры',
      'Индивидуальный подход к каждому заказу',
      'Качественные стёкла и комплектующие',
      'Проверка качества перед отгрузкой',
    ],
    price: 'от 1 200 ₽/м²',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  },
  {
    id: 'delivery',
    icon: Truck,
    title: 'Доставка по Ростову-на-Дону',
    description: 'Быстрая доставка стеклопакетов по городу и области. Бережная транспортировка на специализированном транспорте.',
    features: [
      'Доставка по Ростову за 2 часа',
      'Доставка по области в день заказа',
      'Бережная транспортировка',
      'Специальная упаковка',
    ],
    price: 'от 500 ₽',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 'warranty',
    icon: Shield,
    title: 'Гарантия 5 лет',
    description: 'Официальная гарантия на все виды продукции. Вся продукция сертифицирована и соответствует ГОСТ.',
    features: [
      '5 лет гарантии на стеклопакеты',
      'Сертификаты качества',
      'Соответствие ГОСТ',
      'Проверка продукции перед отгрузкой',
    ],
    price: 'Бесплатно',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
  },
];

/**
 * Дополнительные услуги — реальная информация
 */
const ADDITIONAL_SERVICES = [
  {
    icon: Phone,
    title: 'Бесплатная консультация',
    description: 'Консультируем по телефону, отвечаем на вопросы мгновенно. Помогаем подобрать оптимальное решение.',
  },
  {
    icon: Ruler,
    title: 'Расчёт стоимости',
    description: 'Рассчитаем стоимость заказа по вашим размерам. Предоплата по договорённости.',
  },
  {
    icon: Factory,
    title: 'Срочное изготовление',
    description: 'Производство стандартных стеклопакетов за 1 час. Индивидуальные сроки для сложных заказов.',
  },
];

/**
 * Компонент ServicesPage
 */
const ServicesPage = () => {
  const { setMeta } = useSeoMeta();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Услуги — производство и доставка стеклопакетов в Ростове-на-Дону',
      description: 'Производство стеклопакетов за 1 час, доставка по Ростову-на-Дону за 2 часа. Бесплатный замер, монтаж, гарантия 5 лет. Цены от 1 200 ₽/м². Звоните: +7 (863) 123-45-67',
      keywords: 'услуги производство стеклопакетов Ростов, изготовление стеклопакетов на заказ, доставка стеклопакетов Ростов-на-Дону, замер окон бесплатно, монтаж стеклопакетов',
    });

    // Добавляем структурированные данные для услуг
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Производство стеклопакетов',
      description: 'Изготовление стеклопакетов на заказ за 1 час в Ростове-на-Дону',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Стеклопром',
        telephone: '+7 (863) 123-45-67',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ростов-на-Дону',
          streetAddress: 'ул. Промышленная, 15',
        },
      },
      areaServed: {
        '@type': 'City',
        name: 'Ростов-на-Дону',
      },
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '1200',
          priceCurrency: 'RUB',
          unitText: 'м²',
        },
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-service-schema', 'true');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[data-service-schema]');
      if (existing) existing.remove();
    };
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Breadcrumbs items={[{ label: 'Услуги' }]} />

        {/* Заголовок */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#00407e',
            margin: '0 0 12px 0',
          }}>
            Наши услуги
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#718096',
            lineHeight: 1.7,
            maxWidth: '700px',
            margin: 0,
          }}>
            Полный цикл услуг по изготовлению и доставке стеклопакетов в Ростове-на-Дону. 
            От замера до установки — работаем быстро, качественно и с гарантией.
          </p>
        </header>

        {/* Основные услуги */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {MAIN_SERVICES.map((service, idx) => (
              <article
                key={service.id}
                id={service.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 64, 126, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  scrollMarginTop: '160px',
                  boxShadow: '0 2px 12px rgba(0, 64, 126, 0.04)',
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: idx % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                  gap: '0',
                  alignItems: 'stretch',
                }}>
                  {/* Изображение */}
                  {idx % 2 === 0 && (
                    <div style={{
                      position: 'relative',
                      minHeight: '320px',
                    }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Контент */}
                  <div style={{ padding: '36px 40px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      background: '#ff342f',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      boxShadow: '0 4px 12px rgba(255, 52, 47, 0.2)',
                    }}>
                      <service.icon size={26} color="#ffffff" />
                    </div>
                    
                    <h2 style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#00407e',
                      margin: '0 0 12px 0',
                    }}>
                      {service.title}
                    </h2>
                    
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      color: '#718096',
                      lineHeight: 1.7,
                      margin: '0 0 20px 0',
                    }}>
                      {service.description}
                    </p>

                    <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0 }}>
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            color: '#2D3748',
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(0, 64, 126, 0.06)',
                          }}
                        >
                          <Check size={16} color="#00a3d5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#ff342f',
                      }}>
                        {service.price}
                      </div>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          background: '#ff342f',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '15px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(255, 52, 47, 0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 52, 47, 0.35)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 52, 47, 0.2)'}
                      >
                        Заказать
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Изображение справа для нечётных */}
                  {idx % 2 !== 0 && (
                    <div style={{
                      position: 'relative',
                      minHeight: '320px',
                    }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Дополнительные услуги */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#00407e',
            margin: '0 0 28px 0',
            textAlign: 'center',
          }}>
            Дополнительные услуги
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {ADDITIONAL_SERVICES.map((service, index) => (
              <div
                key={index}
                style={{
                  background: '#f8f9fb',
                  borderRadius: '14px',
                  padding: '28px',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 64, 126, 0.06)',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(0, 163, 213, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#00a3d5',
                }}>
                  <service.icon size={24} />
                </div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#00407e',
                  margin: '0 0 8px 0',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#718096',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA блок */}
        <section style={{
          background: 'linear-gradient(135deg, #00407e 0%, #003366 100%)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '60px',
          textAlign: 'center',
          color: '#ffffff',
        }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '26px',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}>
            Нужна консультация?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            opacity: 0.85,
            margin: '0 0 20px 0',
          }}>
            Позвоните нам или оставьте заявку — ответим на все вопросы
          </p>
          <a
            href="tel:+78631234567"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: '#ff342f',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(255, 52, 47, 0.3)',
            }}
          >
            <Phone size={20} />
            +7 (863) 123-45-67
          </a>
        </section>
      </div>

      <ContactForm />

      {/* Модальное окно заказа */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Заказать звонок"
      >
        <CallbackForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default ServicesPage;
