'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';
// import { UserData } from '@/src/types';

export const getUserInfo = async () => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId: string = session.user!.id!;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
