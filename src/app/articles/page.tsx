import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import ArticlesPage from '@/src/app/articles/articles';

export async function generateMetadata() {
  return metadataHandler('general');
}

const Articles: React.FC = async () => {
  const access = await roleAccess('articles');
  if (!access.isAccess) {
    redirect('/auth/ban');
  }

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <ArticlesPage />;
  }
};

export default Articles;
