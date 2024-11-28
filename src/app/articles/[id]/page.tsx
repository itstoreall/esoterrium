import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import ArticleDetailPage from '@/src/app/articles/[id]/article-detail';

type Props = { params: Promise<{ id: string }> };

const Article = async ({ params }: Props) => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <ArticleDetailPage params={params} />;
  }
};

export default Article;
