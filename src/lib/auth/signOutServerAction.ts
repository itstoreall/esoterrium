'use server';

import { signOut } from '@/src/lib/auth/authConfig';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';

export const handleSignOut = async () => {
  try {
    await unlinkGoogleAccount();
    await signOut();
  } catch (err) {
    throw err;
  }
};
