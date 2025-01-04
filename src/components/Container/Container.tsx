/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { ChildrenProps } from '@/src/types';
import Header from '@/src/components/Layout/Header';
import Footer from '@/src/components/Layout/Footer';

type ContainerProps = ChildrenProps & {
  className?:
    | 'page-wrapper-container'
    | 'header-content-block-container'
    | 'main-aside-combine-wrapper-container'
    | 'main-aside-combine-container'
    | 'sidebar-container'
    | 'sidebar-content-container'
    | 'main-content-block-container'
    | 'auth-form-wrapper-container'
    | 'form-backdrop-container'
    | 'form-content-container'
    // | 'dashboard-main-content-container'
    | 'article-details-container'
    | 'footer-content-block-container';
};

const Container = ({ children, className }: ContainerProps) => {
  useEffect(() => {
    if (className === 'page-wrapper-container') window.scrollTo(0, 0);
  }, []);

  switch (className) {
    case 'page-wrapper-container':
      return (
        <div className={`container ${className}`}>
          <Header />
          {children}
          <Footer />
        </div>
      );

    default:
      return <div className={`container ${className}`}>{children}</div>;
  }
};

export default Container;
