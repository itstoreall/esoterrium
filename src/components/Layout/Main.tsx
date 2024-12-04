import { ChildrenProps } from '@/src/types';
import Container from '@/src/components/Container';

type MainProps = ChildrenProps & {
  className?: 'home-page-main' | 'dashboard-page-main' | 'articles-page-main';
};

const Main = ({ children, className }: MainProps) => (
  <main className={`main ${className}`}>
    <Container className={'main-content-block-container'}>
      <div className="main-content-block">{children}</div>
    </Container>
  </main>
);

export default Main;
