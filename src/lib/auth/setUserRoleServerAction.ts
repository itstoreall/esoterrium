'use server';

import { prisma } from '@/src/lib/prisma/client';
import { AuthRole } from '@prisma/client';

export const setUserRole = async (userId: string, role: AuthRole) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    return true;
  } catch (error) {
    console.error('Failed to set user name:', error);
    throw error;
  }
};
