import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import EditArticlePage from '@/src/app/articles/[id]/edit/edit-article';
import { AuthRoleEnum } from '@/src/enum';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata() {
  return metadataHandler('general');
}

const EditArticle = async ({ params }: Props) => {
  const access = await roleAccess('edit-article');
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
    return <EditArticlePage params={params} />;
  }
};

export default EditArticle;
