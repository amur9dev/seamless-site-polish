/**
 * Страница Cases — наши работы
 * 
 * @description Портфолио выполненных проектов
 */

import { useEffect } from 'react';
import { MapPin, Ruler, Calendar, Building2 } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';

/**
 * Все работы компании
 */
const ALL_CASES = [
  {
    id: 1,
    title: 'ЖК «Западный»',
    type: 'Жилой комплекс',
    location: 'Западный район, Ростов-на-Дону',
    area: '2 500 м²',
    year: '2024',
    description: 'Поставка и установка двухкамерных энергосберегающих стеклопакетов для 5 многоэтажных домов нового жилого комплекса.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'БЦ «Горизонт»',
    type: 'Бизнес-центр',
    location: 'Центр города, Ростов-на-Дону',
    area: '1 800 м²',
    year: '2024',
    description: 'Остекление фасада 12-этажного бизнес-центра мультифункциональными стеклопакетами с солнцезащитой.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Коттедж в Аксае',
    type: 'Частный дом',
    location: 'г. Аксай, Ростовская область',
    area: '120 м²',
    year: '2024',
    description: 'Панорамное остекление загородного коттеджа с арочными окнами и энергосберегающими стеклопакетами.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Школа №45',
    type: 'Социальный объект',
    location: 'Ворошиловский район, Ростов-на-Дону',
    area: '650 м²',
    year: '2023',
    description: 'Полная замена остекления в школе на шумоизоляционные и ударопрочные стеклопакеты для безопасности учеников.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'ТЦ «Мега»',
    type: 'Торговый центр',
    location: 'Левенцовка, Ростов-на-Дону',
    area: '3 200 м²',
    year: '2023',
    description: 'Остекление входной группы и витрин торгового центра ударопрочными закалёнными стеклопакетами.',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'КП «Сосны»',
    type: 'Коттеджный посёлок',
    location: 'Ростовская область',
    area: '3 200 м² (25 домов)',
    year: '2023',
    description: 'Комплексная поставка стеклопакетов для 25 коттеджей с индивидуальными проектами остекления.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Клиника «Здоровье»',
    type: 'Медицинское учреждение',
    location: 'Октябрьский район, Ростов-на-Дону',
    area: '450 м²',
    year: '2023',
    description: 'Установка шумоизоляционных стеклопакетов для создания комфортной обстановки в медицинском центре.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Ресторан «Дон»',
    type: 'Общественное питание',
    location: 'Набережная, Ростов-на-Дону',
    area: '180 м²',
    year: '2023',
    description: 'Панорамное остекление ресторана с видом на Дон. Использованы мультифункциональные стеклопакеты.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Автосалон BMW',
    type: 'Коммерческая недвижимость',
    location: 'Северный район, Ростов-на-Дону',
    area: '800 м²',
    year: '2022',
    description: 'Витражное остекление автосалона с использованием закалённого стекла и солнцезащитных покрытий.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
  },
  {
    id: 10,
    title: 'Квартира на Большой Садовой',
    type: 'Жилая недвижимость',
    location: 'Центр, Ростов-на-Дону',
    area: '45 м²',
    year: '2022',
    description: 'Замена старых деревянных окон на современные шумоизоляционные стеклопакеты в историческом здании.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  },
  {
    id: 11,
    title: 'Гостиница «Ростов»',
    type: 'Гостиничный бизнес',
    location: 'Центр, Ростов-на-Дону',
    area: '1 200 м²',
    year: '2022',
    description: 'Остекление 120 номеров гостиницы энергосберегающими стеклопакетами с повышенной шумоизоляцией.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
  },
  {
    id: 12,
    title: 'Детский сад «Солнышко»',
    type: 'Социальный объект',
    location: 'Советский район, Ростов-на-Дону',
    area: '320 м²',
    year: '2022',
    description: 'Установка безопасных ударопрочных стеклопакетов с закалённым стеклом во всём детском саду.',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=600&h=400&fit=crop',
  },
];

/**
 * Компонент CasesPage
 */
const CasesPage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Наши работы — примеры остекления стеклопакетами в Ростове-на-Дону',
      description: 'Фото выполненных проектов по остеклению в Ростове-на-Дону: жилые комплексы, офисы, коттеджи, торговые центры. Более 500 успешных проектов с 2008 года. Смотрите примеры работ. ☎ +7 (863) 123-45-67',
      keywords: 'примеры работ стеклопакеты Ростов, портфолио остекление Ростов-на-Дону, фото работ стеклопакеты, проекты остекления жилых комплексов',
    });
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <Breadcrumbs items={[{ label: 'Наши работы' }]} />

        {/* Заголовок */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '42px',
            fontWeight: 700,
            color: '#2D3748',
            margin: '0 0 16px 0',
          }}>
            Наши работы
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            color: '#718096',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: 0,
          }}>
            Фотографии выполненных проектов по остеклению в Ростове-на-Дону и Ростовской области. 
            За 16 лет работы мы реализовали более 500 проектов различной сложности.
          </p>
        </header>

        {/* Галерея работ */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {ALL_CASES.map((project) => (
              <article
                key={project.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 51, 102, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Изображение */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                }}>
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.type} в Ростове-на-Дону, площадь ${project.area}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'linear-gradient(135deg, #E30613 0%, #C00000 100%)',
                    color: '#ffffff',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '6px',
                  }}>
                    {project.type}
                  </div>
                </div>

                {/* Контент */}
                <div style={{ padding: '24px' }}>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#2D3748',
                    margin: '0 0 12px 0',
                  }}>
                    {project.title}
                  </h2>
                  
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#718096',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                  }}>
                    {project.description}
                  </p>

                  {/* Детали */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0, 51, 102, 0.06)',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#718096',
                    }}>
                      <MapPin size={14} />
                      {project.location.split(',')[0]}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#718096',
                    }}>
                      <Ruler size={14} />
                      {project.area}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#718096',
                    }}>
                      <Calendar size={14} />
                      {project.year}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#718096',
                    }}>
                      <Building2 size={14} />
                      {project.type}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
          borderRadius: '24px',
          padding: '48px',
          marginBottom: '80px',
          textAlign: 'center',
          color: '#ffffff',
        }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '28px',
            fontWeight: 700,
            margin: '0 0 16px 0',
          }}>
            Хотите увидеть объекты вживую?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            opacity: 0.85,
            margin: '0 0 24px 0',
          }}>
            Мы можем показать объекты, похожие на ваш проект. Свяжитесь с нами!
          </p>
        </section>
      </div>

      <ContactForm />
    </Layout>
  );
};

export default CasesPage;
