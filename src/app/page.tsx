import React from 'react';
import Link from 'next/link';
import metadataHandler from '@/src/utils/metadataHandler';

export async function generateMetadata() {
  return metadataHandler('general');
}

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
