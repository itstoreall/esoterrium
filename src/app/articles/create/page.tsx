import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import CreateArticlePage from '@/src/app/articles/create/create-article';

const CreateArticle: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <CreateArticlePage />;
  }
};

export default CreateArticle;
