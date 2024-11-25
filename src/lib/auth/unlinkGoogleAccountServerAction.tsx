'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';

export const unlinkGoogleAccount = async () => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId: string = session.user!.id!;

  try {
    await prisma.account.deleteMany({
      where: {
        provider: 'google',
        userId: userId,
      },
    });
    return true;
  } catch (error) {
    console.error('Failed to unlink Google account:', error);
    throw error;
  }
};
