'use client';

import Container from '@/src/components/Container';
import Articles from '@/src/components/Page/Articles';

const ArticlesPage = () => {
  return (
    <Container className={'page-wrapper-container'}>
      <Container className={'main-aside-combine-wrapper-container'}>
        <Articles />
      </Container>
    </Container>
  );
};

export default ArticlesPage;
