// 'use client';

import { useEffect, useState } from 'react';
import { AuthRoleEnum } from '@/src/enum';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';

const useAccount = () => {
  const [role, setRole] = useState<AuthRoleEnum>();

  const isAdminRole = () => role === AuthRoleEnum.Admin;

  const handleUserRole = async () => {
    const role = await getUserRole();
    if (role) {
      setRole(role as AuthRoleEnum);
    } else {
      console.log(`User role: ${role} => signed out...`);
      handleSignOut();
    }
  };

  useEffect(() => {
    handleUserRole();
  }, []);

  return {
    userRole: role,
    handleUserRole,
    isAdminRole,
  };
};

export default useAccount;
