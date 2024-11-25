'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';

export const getUserRole = async () => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId: string = session.user!.id!;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role || null;
  } catch (error) {
    console.error('Failed to fetch user role:', error);
    throw error;
  }
};
