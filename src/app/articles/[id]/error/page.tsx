'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/articles');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We encountered an error while processing your request.</p>
      <p>Redirecting to the dashboard in 5 seconds...</p>
    </div>
  );
};

export default ErrorPage;
