import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Title from './Title';
import SidebarCategories from '../SidebarCategories';

type SidebarProps = {
  className?: 'article-details-sidebar';
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <Container className={'sidebar-container'}>
      <aside className={`sidebar ${className}`}>
        <Section className={'main-hero-section'}>{null}</Section>

        <Container className={'sidebar-content-container'}>
          <Section className="sidebar-title-section">
            <Title tag="h3" text="Рубрики" className="sidebar-title" />
          </Section>

          <SidebarCategories />

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
            Реклама
          </div>

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
            Реклама
          </div>
        </Container>

        <Section className={'main-final-section'}>{null}</Section>
      </aside>
    </Container>
  );
};

export default Sidebar;
