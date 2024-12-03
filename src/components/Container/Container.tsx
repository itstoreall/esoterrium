/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ChildrenProps } from '@/src/types';
import Header from '../Layout/Header';

type ContainerProps = ChildrenProps & {
  className?: 'page-wrapper' | 'header';
};

const Container = ({ children, className }: ContainerProps) => {
  const session = useSession();

  useEffect(() => {
    if (className === 'page-wrapper') window.scrollTo(0, 0);
  }, []);

  switch (className) {
    case 'page-wrapper':
      return (
        <div className={`container ${className}`}>
          <Header session={session} />
          {children}

          {/* <Footer /> */}
        </div>
      );

    default:
      return <div className={`container ${className}`}>{children}</div>;
  }
};

export default Container;
