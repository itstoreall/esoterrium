import { Article } from '@/src/lib/mongoose';
// import { redirect } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

/* remove later
// Fetch the article on the server side
const getArticleById = async (id: string) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
  return await Article.findById(id).exec();
};
*/

const ArticlePage = async ({ params }: Props) => {
  const { id } = await params;

  const article = await Article.findById(id).exec();

  if (!article) {
    return <div>Error article</div>;
  }

  // if (!article) redirect(`/articles/${id}/error`);

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
