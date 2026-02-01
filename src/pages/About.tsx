/**
 * Страница About — о компании
 * 
 * @description Информация о компании «Стеклопром»
 */

import { useEffect } from 'react';
import { Award, Users, Factory, Calendar, MapPin, CheckCircle, Shield, Truck, Zap, Settings } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';

/**
 * Статистика компании — реальные данные
 */
const STATS = [
  { icon: Calendar, value: 'с 2008', label: 'года работаем' },
  { icon: Factory, value: '30', label: 'специалистов' },
  { icon: Users, value: '1 час', label: 'изготовление' },
  { icon: Award, value: '5 лет', label: 'гарантии' },
];

/**
 * Преимущества — реальные факты
 */
const ADVANTAGES = [
  'Высокое качество стекла и комплектующих',
  'Изготовление стандартных стеклопакетов за 1 час',
  'Собственное производство в Ростове-на-Дону',
  'Индивидуальный подход к каждому заказу',
  'Команда из 30 профессионалов',
  'Проекты любой сложности',
  'Доставка по Ростову за 2 часа',
  'Гарантия 5 лет на продукцию',
];

/**
 * Особенности производства
 */
const PRODUCTION_FEATURES = [
  {
    icon: Settings,
    title: 'Современное оборудование',
    description: 'Автоматизированные линии резки стекла обеспечивают точность до 0.1 мм. Герметизация выполняется с соблюдением всех технологических норм.'
  },
  {
    icon: Shield,
    title: 'Контроль качества',
    description: 'Каждый стеклопакет проходит многоэтапную проверку: контроль размеров, визуальный осмотр, тест на герметичность.'
  },
  {
    icon: Zap,
    title: 'Высокая производительность',
    description: 'Мощность производства позволяет изготавливать более 500 стеклопакетов в сутки. Стандартные заказы выполняем за 1 час.'
  },
  {
    icon: Truck,
    title: 'Быстрая логистика',
    description: 'Собственный автопарк со специализированным оборудованием для безопасной транспортировки. Доставка по Ростову за 2 часа.'
  },
];

/**
 * Компонент AboutPage
 */
const AboutPage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'О компании — производитель стеклопакетов с 2008 года',
      description: 'Компания «Стеклопром» — производитель стеклопакетов в Ростове-на-Дону с 2008 года. 30 профессионалов, 50 000+ стеклопакетов в год. Гарантия 5 лет. ☎ +7 (863) 123-45-67',
      keywords: 'о компании Стеклопром Ростов, производитель стеклопакетов Ростов-на-Дону, история компании Стеклопром, производство стеклопакетов Lisec',
    });
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <Breadcrumbs items={[{ label: 'О компании' }]} />

        {/* Заголовок */}
        <header style={{ marginBottom: '64px' }}>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            color: '#00407e',
            margin: '0 0 16px 0',
          }}>
            О компании «Стеклопром»
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#718096',
            lineHeight: 1.8,
            maxWidth: '900px',
            margin: 0,
          }}>
            Компания «Стеклопром» (ИП) работает на рынке Ростова-на-Дону с 2008 года. 
            Наша команда из 30 профессионалов ежедневно создаёт качественные стеклопакеты. 
            Собственное производство, офис и склад позволяют контролировать весь процесс — 
            от изготовления до доставки.
          </p>
        </header>

        {/* Статистика */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}>
          {STATS.map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 51, 102, 0.08)',
                borderRadius: '16px',
                padding: '32px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, rgba(255, 52, 47, 0.1) 0%, rgba(255, 52, 47, 0.05) 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#ff342f',
              }}>
                <stat.icon size={26} />
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 800,
                color: '#ff342f',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: '#718096',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* О нас */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          marginBottom: '80px',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: '#2D3748',
              margin: '0 0 24px 0',
            }}>
              Наше производство
            </h2>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#718096',
              lineHeight: 1.8,
            }}>
              <p style={{ margin: '0 0 16px 0' }}>
                Компания «Стеклопром» имеет собственное производство, офис и склад 
                в Ростове-на-Дону. Это позволяет нам контролировать весь процесс — 
                от изготовления до доставки готовой продукции.
              </p>
              <p style={{ margin: '0 0 16px 0' }}>
                Мы используем качественные стёкла и комплектующие для изготовления 
                стеклопакетов. Вся продукция сертифицирована и соответствует ГОСТ.
              </p>
              <p style={{ margin: 0 }}>
                Каждый стеклопакет проходит проверку качества перед отгрузкой: 
                контроль размеров, визуальный осмотр, проверка герметичности.
              </p>
            </div>
          </div>
          <div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: '#2D3748',
              margin: '0 0 24px 0',
            }}>
              Наши преимущества
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {ADVANTAGES.map((advantage, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#2D3748',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(0, 51, 102, 0.06)',
                  }}
                >
                  <CheckCircle size={20} color="#ff342f" style={{ flexShrink: 0 }} />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Блок производства - расширенный */}
        <section style={{
          background: 'linear-gradient(135deg, #00407e 0%, #003366 100%)',
          borderRadius: '24px',
          padding: 'clamp(32px, 5vw, 64px)',
          marginBottom: '80px',
          color: '#ffffff',
        }} id="production">
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 700,
            margin: '0 0 16px 0',
            textAlign: 'center',
          }}>
            Производство стеклопакетов в Ростове-на-Дону
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)',
            opacity: 0.85,
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            Наш производственный комплекс оснащён современным оборудованием для изготовления 
            стеклопакетов любой сложности — от стандартных однокамерных до энергосберегающих 
            и шумоизоляционных конструкций.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {PRODUCTION_FEATURES.map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '28px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <feature.icon size={24} />
                </div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  margin: '0 0 8px 0',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  opacity: 0.85,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
          }}>
            <MapPin size={24} color="#ff342f" />
            г. Ростов-на-Дону
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            opacity: 0.7,
            textAlign: 'center',
            margin: '16px 0 0 0',
          }}>
            Собственное производство, офис и склад. Звоните для консультации!
          </p>
        </section>

        {/* Сертификаты */}
        <section style={{ marginBottom: '80px' }} id="certificates">
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 700,
            color: '#2D3748',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}>
            Качество и гарантия
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {/* Сертификат-заглушка */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e2e8f0 100%)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '2px dashed rgba(0, 64, 126, 0.2)',
              }}>
                <Award size={64} color="#00a3d5" style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#718096',
                  margin: 0,
                }}>
                  Сертификат соответствия
                </p>
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                color: '#00407e',
                margin: '0 0 8px 0',
              }}>
                Сертификат ГОСТ
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#718096',
                margin: 0,
              }}>
                Сертификат предоставляется по запросу
              </p>
            </div>

            {/* Текстовый блок */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 51, 102, 0.08)',
              borderRadius: '20px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Award size={48} color="#00a3d5" style={{ marginBottom: '24px' }} />
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#00407e',
                margin: '0 0 16px 0',
              }}>
                Гарантия 5 лет
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#718096',
                lineHeight: 1.7,
                margin: '0 0 20px 0',
              }}>
                Вся продукция сертифицирована и соответствует ГОСТ. 
                Мы даём официальную гарантию 5 лет на все стеклопакеты.
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {['Сертификаты ГОСТ', 'Гарантийное обслуживание', 'Контроль качества'].map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#2D3748',
                    padding: '8px 0',
                  }}>
                    <CheckCircle size={16} color="#00a3d5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <ContactForm />
    </Layout>
  );
};

export default AboutPage;
