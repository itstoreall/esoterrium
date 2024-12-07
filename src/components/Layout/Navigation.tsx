import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import { HeaderProps } from '@/src/types/header';
// import { GoSignOut } from 'react-icons/go';
import { FiUser } from 'react-icons/fi';
import Title from '@/src/components/Layout/Title';
// import SignOutButton from '../Button/SignOutButton';
import Button from '@/src/components/Button/Button';

// const navLinks = [
//   { label: 'account', href: '/dashboard' },
//   { label: 'articles', href: '/articles' },
// ];

type ButtonStyle = 'nav-link-react-icon-button' | 'nav-link-text-button';

type NavLinkProps = {
  path: string;
  className?: ButtonStyle;
  content: ReactNode;
  title?: string;
  isDisable?: boolean;
};

const Navigation = () => {
  const path = usePathname();

  const splitPath = path.split('/');
  const pathLength = splitPath.length;

  // console.log('path:', path);
  // console.log('path:', path.split('/').length);

  const isHomePage = path === '/';
  const isSignInPage = path === '/auth/sign-in';
  const isDashboardPage = path.includes('dashboard');
  const isArticlesPage = path.includes('articles') && pathLength === 2;
  // const isArticles = path.includes('articles');
  // const isArticleId = isArticles && splitPath[2]?.length === 24;
  // const isArticleDetailsPage = isArticles && isArticleId;
  // const isArticleCreatePage = isArticles && path.includes('create');
  // const isArticleEditPage = isArticles && pathLength === 4;

  const isDisableArticles = isHomePage || isSignInPage || isArticlesPage;
  const isDisableAccount = isSignInPage || isDashboardPage;

  const isHiddenArticles = isHomePage || isSignInPage;

  const Logo = () => (
    <Link href={'/'}>
      <Title text="Esoterrium" className="logo-title" />
    </Link>
  );

  const NavLinkButton = (props: NavLinkProps) => {
    const { path, className, content, title, isDisable } = props;
    return isDisable ? (
      <Button className={className} title={title} isDisable={isDisable}>
        {content}
      </Button>
    ) : (
      <Link className="navigation-link" href={path}>
        <Button className={className} title={title}>
          {content}
        </Button>
      </Link>
    );
  };

  return (
    <nav className="navigation">
      <div className="navigation-logo-block">
        <Logo />
      </div>

      <div className="navigation-button-block">
        {!isHiddenArticles && (
          <NavLinkButton
            path={'/articles'}
            className="nav-link-text-button"
            content={'Публикации'}
            isDisable={isDisableArticles}
          />
        )}
        <NavLinkButton
          path={'/dashboard'}
          className="nav-link-react-icon-button"
          content={<FiUser size={20} />}
          title={'Вход'}
          isDisable={isDisableAccount}
        />
      </div>
    </nav>
  );
};

export default Navigation;
