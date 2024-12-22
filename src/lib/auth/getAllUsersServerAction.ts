'use server';

import { AuthRoleEnum } from '@/src/enum';
import { prisma } from '@/src/lib/prisma/client';

export const getAllUsers = async () => {
  try {
    const res = await prisma.user.findMany({
      /*
      include: { accounts: true }
      */
    });
    const mappedUsers = res.map((user) => ({
      ...user,
      role: AuthRoleEnum[user.role as keyof typeof AuthRoleEnum],
    }));
    return mappedUsers;
  } catch (error) {
    console.error('Failed to fetch all users:', error);
    throw error;
  }
};
