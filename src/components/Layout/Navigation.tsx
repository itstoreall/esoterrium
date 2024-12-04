import { ReactNode } from 'react';
import Link from 'next/link';
import { HeaderProps } from '@/src/types/header';
import { GoSignIn } from 'react-icons/go';
import { GoSignOut } from 'react-icons/go';
// import { IconType } from 'react-icons';
import Title from '@/src/components/Layout/Title';
import SignOutButton from '../Button/SignOutButton';
import Button from '@/src/components/Button/Button';

type NavLinkProps = {
  path: string;
  className?: 'nav-link-react-icon-button' | 'nav-link-text-button';
  content: ReactNode;
  title?: string;
};

const Logo = () => (
  <Link href={'/'}>
    <Title text="Esoterrium" />
  </Link>
);

const NavLinkButton = ({ path, className, content, title }: NavLinkProps) => {
  return (
    <Link className="navigation-link" href={path}>
      <Button className={className} title={title}>
        {content}
      </Button>
    </Link>
  );
};

const Navigation = ({ session }: HeaderProps) => {
  // console.log('session ==>', session);

  return (
    <nav className="navigation">
      <div className="navigation-logo-block">
        <Logo />
      </div>

      <div className="navigation-button-block">
        {session.status !== 'authenticated' ? (
          <NavLinkButton
            path={'/dashboard'}
            className="nav-link-react-icon-button"
            content={<GoSignIn size={20} />}
            title={'Вход'}
          />
        ) : (
          <>
            <NavLinkButton
              path={'/articles'}
              className="nav-link-text-button"
              content={'Статьи'}
            />
            <SignOutButton
              className="nav-link-react-icon-button"
              content={<GoSignOut size={20} />}
              title={'Вьіход'}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
