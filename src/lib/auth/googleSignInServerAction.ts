'use server';

import { signIn } from '@/src/lib/auth/authConfig';

export const handleGoogleSignIn = async (page: string) => {
  try {
    await signIn('google', { redirectTo: `/${page}` });
  } catch (error) {
    throw error;
  }
};
