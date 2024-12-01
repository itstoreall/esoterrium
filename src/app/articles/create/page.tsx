import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import CreateArticlePage from '@/src/app/articles/create/create-article';

export async function generateMetadata() {
  return metadataHandler('general');
}

const CreateArticle: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <CreateArticlePage />;
  }
};

export default CreateArticle;
