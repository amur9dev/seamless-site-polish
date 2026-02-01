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
 * Все работы компании (заглушки)
 */
const ALL_CASES = [
  {
    id: 1,
    title: 'Проект №1',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Проект №2',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Проект №3',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Проект №4',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Проект №5',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Проект №6',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
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

      </div>

      <ContactForm />
    </Layout>
  );
};

export default CasesPage;
