import { ArticleData } from '@/src/types';
import Container from '@/src/components/Container';
// import ArticleDetails from '@/src/components/Page/ArticleDetails';

const ArticleDetailPage = async ({ article }: { article: ArticleData }) => {
  return (
    <Container className={'page-wrapper-container'}>
      <Container className={'main-aside-combine-wrapper-container'}>
        <div style={{ color: 'teal', paddingTop: '100px' }}>
          Details 3 {article.title}
        </div>
        {/* <ArticleDetails article={article} /> */}
      </Container>
    </Container>
  );
};

export default ArticleDetailPage;
