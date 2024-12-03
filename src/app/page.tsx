import React from 'react';
import metadataHandler from '@/src/utils/metadataHandler';
import Container from '../components/Container/Container';
import Home from '../components/Page/Home';

export async function generateMetadata() {
  return metadataHandler('general');
}

const HomePage = () => {
  return (
    <Container className={'page-wrapper'}>
      <Home />
    </Container>
  );
};

export default HomePage;
