import { ChildrenProps } from '@/src/types';
import Container from '@/src/components/Container';
import Section from '@/src/components/Section';

type SidebarProps = ChildrenProps & {
  className?: 'article-details-sidebar';
};

const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <Container className={'sidebar-container'}>
      <aside className={`sidebar ${className}`}>
        <Section className={'main-hero-section'}>{null}</Section>

        <Container className={'sidebar-content-container'}>
          {children}
        </Container>

        <Section className={'main-final-section'}>{null}</Section>
      </aside>
    </Container>
  );
};

export default Sidebar;
