import { redirect } from 'next/navigation';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import AdminPage from '@/src/app/admin/admin';

const Admin: React.FC = async () => {
  const access = await roleAccess('admin');
  if (!access.isAccess) {
    redirect('/auth/ban');
  }

  const role = await getUserRole();

  if (role === 'ADMIN') {
    return <AdminPage />;
  } else {
    redirect('/dashboard');
  }
};

export default Admin;
