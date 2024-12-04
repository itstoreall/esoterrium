import React from 'react';
import metadataHandler from '@/src/utils/metadataHandler';
import Container from '@/src/components/Container';
import Home from '@/src/components/Page/Home';

export async function generateMetadata() {
  return metadataHandler('general');
}

const HomePage = () => {
  return (
    <Container className={'page-wrapper-container'}>
      <Home />
    </Container>
  );
};

export default HomePage;
