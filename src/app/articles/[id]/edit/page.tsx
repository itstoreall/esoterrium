import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import EditArticlePage from '@/src/app/articles/[id]/edit/edit-article';

type Props = { params: Promise<{ id: string }> };

const EditArticle = async ({ params }: Props) => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <EditArticlePage params={params} />;
  }
};

export default EditArticle;
