import { usePathname } from 'next/navigation';
import Container from '@/src/components/Container';
import Navigation from '@/src/components/Layout/Navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Container className={'header-content-block-container'}>
        <div className="header-content-block">
          {pathname !== '/auth/sign-in' && <Navigation />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
