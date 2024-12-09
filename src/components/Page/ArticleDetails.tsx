import { ArticleData } from '@/src/types';
import ArticleDetailsContent from '@/src/components/ArticleDetailsContent';

const ArticleDetails = ({ article }: { article: ArticleData }) => (
  <ArticleDetailsContent article={article} />
);

export default ArticleDetails;
