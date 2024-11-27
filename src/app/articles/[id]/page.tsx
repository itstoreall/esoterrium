import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import ArticlePage from '@/src/app/articles/[id]/article';

type Props = { params: Promise<{ id: string }> };

const Articles = async ({ params }: Props) => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <ArticlePage params={params} />;
  }
};

export default Articles;
