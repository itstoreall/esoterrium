'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';

export const getAccountLinkStatus = async () => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId: string = session.user!.id!;

  try {
    const accountExists = await prisma.account.findFirst({
      where: {
        provider: 'google',
        userId: userId,
      },
    });

    return Boolean(accountExists);
  } catch (error) {
    console.error('Failed to check if user has Google account linked:', error);
    throw error;
  }
};
