import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HeaderProps } from '@/src/types/header';
import { GoSignOut } from 'react-icons/go';
import { FiUser } from 'react-icons/fi';
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
  console.log('session ==>', session);

  const path = usePathname();

  const splitPath = path.split('/');
  const pathLength = splitPath.length;

  // console.log('path:', path);
  // console.log('path:', path.split('/').length);

  const isHomePage = path === '/';
  const isSignInPage = path === '/auth/sign-in';
  const isDashboardPage = path.includes('dashboard');
  const isArticlesPage = path.includes('articles');
  const isArticleId = isArticlesPage && splitPath[2]?.length === 24;
  const isArticleDetailsPage = isArticlesPage && isArticleId;
  const isArticleCreatePage = isArticlesPage && path.includes('create');
  const isArticleEditPage = isArticlesPage && pathLength === 4;

  return (
    <nav className="navigation">
      <div className="navigation-logo-block">
        <Logo />
      </div>

      <div className="navigation-button-block">
        {((!isHomePage && isDashboardPage) ||
          isArticleDetailsPage ||
          isArticleCreatePage ||
          isArticleEditPage) && (
          <NavLinkButton
            path={'/articles'}
            className="nav-link-text-button"
            content={'Статьи'}
          />
        )}
        {isDashboardPage && (
          <SignOutButton
            className="nav-link-react-icon-button"
            content={<GoSignOut size={20} />}
            title={'Вьіход'}
          />
        )}
        {!isSignInPage && !isDashboardPage && (
          <NavLinkButton
            path={'/dashboard'}
            className="nav-link-react-icon-button"
            content={<FiUser size={20} />}
            title={'Вход'}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
