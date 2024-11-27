import { Article } from '@/src/lib/mongoose/models/Article';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

type Props = { params: Promise<{ id: string }> };

// Fetch the article on the server side
const getArticleById = async (id: string) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
  return await Article.findById(id).exec();
};

const ArticlePage = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const article = await getArticleById(id); // 67461eca11d202070efa0c33

    // if (!article) {
    //   return <div>Article not found 2</div>;
    // }

    if (!article) {
      throw new Error('Article not found');
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
  } catch (error) {
    console.error(`Error fetching article: ${error}`);
    // Redirect to error page
    redirect(`/articles/${id}/error`);
  }
};

export default ArticlePage;
