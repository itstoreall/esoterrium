import { ChildrenProps } from '@/src/types';
import Container from '@/src/components/Container';

type SidebarProps = ChildrenProps & {
  className?: 'article-details-sidebar';
};

const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <Container className={'sidebar-container'}>
      <aside className={`sidebar ${className}`}>
        <Container className={'sidebar-content-container'}>
          {children}
        </Container>
      </aside>
    </Container>
  );
};

export default Sidebar;
