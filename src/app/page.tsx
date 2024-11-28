import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>

      <main>Home</main>
    </div>
  );
};

export default HomePage;
