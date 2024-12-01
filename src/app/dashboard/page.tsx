import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { DashboardPage } from '@/src/app/dashboard/dashboard';

export async function generateMetadata() {
  return metadataHandler('general');
}

const Dashboard: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <DashboardPage />;
  }
};

export default Dashboard;
