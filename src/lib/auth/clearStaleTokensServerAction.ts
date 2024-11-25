'use server';

import { prisma } from '@/src/lib/prisma/client';

export const clearStaleTokens = async () => {
  const expireDate = new Date();
  const plusHours = 24;
  expireDate.setHours(expireDate.getHours() + plusHours);
  const CustomUTC = expireDate.toISOString();

  try {
    await prisma.verificationToken.deleteMany({
      where: { expires: { lt: CustomUTC } },
    });
  } catch (error) {
    throw error;
  }
};
