'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';

export const setUserName = async (name: string) => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId: string = session.user!.id!;

  name = name.trim();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name },
    });
    return true;
  } catch (error) {
    console.error('Failed to set user name:', error);
    throw error;
  }
};
