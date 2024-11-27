// import ArticleModel from '@/src/lib/mongoose/models/ArticleModel';
import { Article } from '@/src/lib/mongoose/models/Article';
import mongoose from 'mongoose';

// Fetch the article on the server side
const getArticleById = async (id: string) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
  return await Article.findById(id).exec();
};

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const article = await getArticleById(id); // 67461eca11d202070efa0c33

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>
        <small>
          Created on: {new Date(article.createdAt).toLocaleDateString()} |
          Updated on: {new Date(article.updatedAt).toLocaleDateString()}
        </small>
      </p>
    </div>
  );
};

export default ArticlePage;
