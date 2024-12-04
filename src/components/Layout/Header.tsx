import { HeaderProps } from '@/src/types/header';
import Container from '@/src/components/Container';
import Navigation from '@/src/components/Layout/Navigation';

const Header = ({ session }: HeaderProps) => {
  return (
    <header className="header">
      <Container className={'header-content-block-container'}>
        <div className="footer-content-block">
          <Navigation session={session} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
