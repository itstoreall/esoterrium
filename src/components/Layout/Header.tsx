import { SessionContextValue } from 'next-auth/react';
import Container from '../Container/Container';
// import Navigation from '@/src/components/Layout/Navigation';
// import Logo from '@/src/components/Layout/Logo';

type Props = { session: SessionContextValue };

const Header = ({ session }: Props) => {
  console.log('session ==>', session);

  return (
    <header className="header">
      <Container className={'header'}>
        <div className="header-content">
          {/* <Logo className="header-logo" />
          <Navigation session={session} /> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
