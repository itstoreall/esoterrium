import Link from 'next/link';
import { HeaderProps } from '@/src/types/header';
import Title from '@/src/components/Layout/Title';
import Button from '@/src/components/Button/Button';

type NavLinkProps = { path: string; text: string };

const Logo = () => (
  <Link href={'/'}>
    <Title text="Esoterrium" />
  </Link>
);

const NavLink = ({ path, text }: NavLinkProps) => {
  return (
    <Link href={path}>
      <Button className="nav-link-button">{text}</Button>
    </Link>
  );
};

const Navigation = ({ session }: HeaderProps) => {
  console.log('session ==>', session);

  return (
    <nav className="navigation">
      <div className="navigation-logo-block">
        <Logo />
      </div>

      <div className="navigation-button-block">
        <NavLink path={'/dashboard'} text={'Вход'} />
      </div>
    </nav>
  );
};

export default Navigation;