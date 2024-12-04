/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ChildrenProps } from '@/src/types';
import Header from '@/src/components/Layout/Header';
import Footer from '@/src/components/Layout/Footer';

type ContainerProps = ChildrenProps & {
  className?:
    | 'page-wrapper-container'
    | 'header-content-block-container'
    | 'main-content-block-container'
    | 'footer-content-block-container';
};

const Container = ({ children, className }: ContainerProps) => {
  const session = useSession();

  useEffect(() => {
    if (className === 'page-wrapper-container') window.scrollTo(0, 0);
  }, []);

  switch (className) {
    case 'page-wrapper-container':
      return (
        <div className={`container ${className}`}>
          <Header session={session} />
          {children}

          <Footer />
        </div>
      );

    default:
      return <div className={`container ${className}`}>{children}</div>;
  }
};

export default Container;
