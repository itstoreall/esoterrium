'use server';

import { auth } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';
// import { redirect } from 'next/navigation';

export const getUserRole = async () => {
  const session = await auth();
  if (!session) {
    return null;
    // redirect('/dashboard');
    // throw new Error('Unauthorized');
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
