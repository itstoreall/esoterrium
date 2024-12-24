import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import CreateArticlePage from '@/src/app/articles/create/create-article';
import { AuthRoleEnum } from '@/src/enum';

export async function generateMetadata() {
  return metadataHandler('general');
}

const CreateArticle: React.FC = async () => {
  const access = await roleAccess('create-article');
  if (!access.isAccess) {
    redirect('/auth/ban');
  }

  const isAuthenticated = await checkIsAuthenticated();
  const userRole = await getUserRole();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else if (userRole !== AuthRoleEnum.Admin) {
    redirect('/articles');
  } else {
    return <CreateArticlePage />;
  }
};

export default CreateArticle;
