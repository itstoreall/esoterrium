import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import Title from '@/src/components/Layout/Title';
import Button from '@/src/components/Button/Button';

type ButtonStyle =
  | 'nav-link-react-icon-button '
  | 'nav-link-react-icon-button active'
  | 'nav-link-text-button '
  | 'nav-link-text-button active';

type NavLinkProps = {
  path: string;
  className?: ButtonStyle;
  content: ReactNode;
  title?: string;
  isDisable?: boolean;
};

const Navigation = () => {
  const path = usePathname();

  /*
  const splitPath = path.split('/');
  const pathLength = splitPath.length;
  */

  const isHomePage = path === '/';
  const isSignInPage = path === '/auth/sign-in';
  const isDashboardPage = path === '/dashboard';
  const isArticlesPage = path === '/articles';

  const isDisableArticles = isHomePage || isSignInPage || isArticlesPage;

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
            className={`nav-link-text-button ${isArticlesPage ? 'active' : ''}`}
            content={'Публикации'}
            isDisable={isDisableArticles}
          />
        )}
        <NavLinkButton
          path={'/dashboard'}
          className={`nav-link-react-icon-button ${
            isDashboardPage ? 'active' : ''
          }`}
          content={<FiUser size={20} />}
          title={'Аккаунт'}
          isDisable={isDashboardPage}
        />
      </div>
    </nav>
  );
};

export default Navigation;
