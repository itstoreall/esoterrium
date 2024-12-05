'use client';

import Container from '@/src/components/Container';
import Articles from '@/src/components/Page/Articles';

const ArticlesPage = () => {
  return (
    <Container className={'page-wrapper-container'}>
      <Articles />
    </Container>
  );
};

export default ArticlesPage;
