// import { redirect } from 'next/navigation';
// import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
// import ArticlePage from '@/src/app/articles/[id]/article';
import { Article } from '@/src/lib/mongoose/models/Article';

type Props = { params: Promise<{ id: string }> };

const Articles = async ({ params }: Props) => {
  // const isAuthenticated = await checkIsAuthenticated();

  const { id } = await params;

  const article = await Article.findById(id).exec(); // 67461eca11d202070efa0c33

  if (!article) {
    return <div>Article not found 2</div>;
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

  /*
  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <ArticlePage params={params} />;
  }
  */
};

export default Articles;
