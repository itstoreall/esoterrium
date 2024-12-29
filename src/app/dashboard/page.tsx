import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { DashboardPage } from '@/src/app/dashboard/dashboard';

export async function generateMetadata() {
  return metadataHandler('general');
}

const Dashboard: React.FC = async () => {
  // /*
  const access = await roleAccess('dashboard');
  // console.log(0, access);

  if (!access.isAccess) {
    // console.log(11);
    if (!access.role) {
      redirect('/auth/sign-in');
    } else redirect('/auth/ban');
  }

  // console.log(2);
  // */

  // /*
  const isAuthenticated = await checkIsAuthenticated();

  // console.log(3);

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <DashboardPage />;
  }
  // */
};

export default Dashboard;
