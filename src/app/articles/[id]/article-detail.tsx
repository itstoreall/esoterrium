import { ArticleData } from '@/src/types';
import Container from '@/src/components/Container';
import ArticleDetails from '@/src/components/Page/ArticleDetails';

const ArticleDetailPage = async ({ article }: { article: ArticleData }) => {
  return (
    <Container className={'page-wrapper-container'}>
      <ArticleDetails article={article} />
    </Container>
  );
};

export default ArticleDetailPage;
