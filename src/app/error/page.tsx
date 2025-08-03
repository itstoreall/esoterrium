'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
      // router.push('/articles');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: '#52585c',
        }}
      >
        <h1 style={{ color: '#52585c' }}>Oops! Something went wrong!</h1>
        <p style={{ color: '#52585c' }}>
          We encountered an error while processing your request.
        </p>
        <p style={{ color: '#52585c' }}>
          Redirecting to the Home Page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
