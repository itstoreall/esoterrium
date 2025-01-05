import SidebarLatestArticle from '@/src/components/SidebarLatestArticleBlock';
import SidebarCategories from '@/src/components/SidebarCategories';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Section from '@/src/components/Section';
// import useLatestArticle from '@/src/hooks/useLatestArticle';
// import { useEffect, useState } from 'react';

type SidebarProps = {
  className?: 'article-details-sidebar' | 'articles-sidebar';
  handleCategory?: (category: string) => void;
};

const Sidebar = (props: SidebarProps) => {
  const { className, handleCategory } = props;

  return (
    <Container className={'sidebar-container'}>
      <aside className={`sidebar ${className}`}>
        <Container className={'sidebar-content-container'}>
          {handleCategory && (
            <>
              <Section className="sidebar-heading-section first-element">
                <Title tag="h3" text="Рубрики" className="page-main-title" />
              </Section>

              <SidebarCategories handleCategory={handleCategory} />
            </>
          )}

          {
            <div className="sidebar-content-wrapper">
              {!handleCategory && (
                <>
                  <Section className="sidebar-heading-section first-element">
                    <Title
                      tag="h3"
                      text="Новинка"
                      className="page-main-title"
                    />
                  </Section>

                  <SidebarLatestArticle />
                </>
              )}

              <Section className="sidebar-heading-section">
                <Title tag="h3" text="Сообщество" className="page-main-title" />
              </Section>

              <div
                style={{
                  // backgroundColor: 'teal',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '260px',
                  color: '#c2c4c5',
                  border: '1px solid #c2c4c5',
                }}
              >
                Ad
              </div>
            </div>
          }
        </Container>
      </aside>
    </Container>
  );
};

export default Sidebar;
