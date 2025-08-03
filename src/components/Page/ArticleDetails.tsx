import { ArticleData } from '@/src/types';
// import ArticleDetailsContent from '@/src/components/ArticleDetailsContent';

const ArticleDetails = ({ article }: { article: ArticleData }) => (
  <div style={{ color: 'teal', paddingTop: '100px' }}>
    Details 4 {article.author}
  </div>
  // <ArticleDetailsContent article={article} />
);

export default ArticleDetails;
