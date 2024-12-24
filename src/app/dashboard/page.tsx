import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { DashboardPage } from '@/src/app/dashboard/dashboard';

export async function generateMetadata() {
  return metadataHandler('general');
}

const Dashboard: React.FC = async () => {
  const access = await roleAccess('dashboard');
  if (!access.isAccess) {
    redirect('/auth/ban');
  }

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <DashboardPage />;
  }
};

export default Dashboard;
