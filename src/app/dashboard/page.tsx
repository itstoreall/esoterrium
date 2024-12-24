import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { DashboardPage } from '@/src/app/dashboard/dashboard';

export async function generateMetadata() {
  return metadataHandler('general');
}

const Dashboard: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  const { isAccess } = await roleAccess('dashboard');

  console.log('isAccess:', isAccess);

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else if (!isAccess) {
    redirect('/auth/ban');
  } else {
    return <DashboardPage />;
  }
};

export default Dashboard;
