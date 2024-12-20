import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Title from './Title';
import SidebarCategories from '../SidebarCategories';

type SidebarProps = {
  className?: 'article-details-sidebar' | 'articles-sidebar';
  handleCategory?: (category: string) => void;
};

const Sidebar = ({ className, handleCategory }: SidebarProps) => {
  return (
    <Container className={'sidebar-container'}>
      <aside className={`sidebar ${className}`}>
        <Section className={'main-hero-section'}>{null}</Section>

        <Container className={'sidebar-content-container'}>
          {handleCategory && (
            <>
              <Section className="sidebar-title-section">
                <Title tag="h3" text="Рубрики" className="sidebar-title" />
              </Section>

              <SidebarCategories handleCategory={handleCategory} />
            </>
          )}

          {!handleCategory && (
            <>
              <Section className="sidebar-title-section">
                <Title tag="h3" text="Новинка" className="sidebar-title" />
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
                Публикация
              </div>
            </>
          )}

          <Section className="sidebar-title-section">
            <Title tag="h3" text="Сообщество" className="sidebar-title" />
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
        </Container>

        <Section className={'main-final-section'}>{null}</Section>
      </aside>
    </Container>
  );
};

export default Sidebar;
