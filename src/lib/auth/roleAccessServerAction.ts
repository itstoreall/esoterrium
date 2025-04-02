'use server';

import { AuthRoleEnum } from '@/src/enum';
import { getUserRole } from './getUserRoleServerAction';
import { AuthRole } from '@prisma/client';

type Page =
  | 'admin'
  | 'dashboard'
  | 'articles'
  | 'article-details'
  | 'create-article'
  | 'edit-article';

export const roleAccess = async (page: Page) => {
  const role = await getUserRole();

  // console.log(`Role for ${page}:`, role);

  const isGuest = () => role === AuthRoleEnum.Guest;
  const isBanned = () => role === AuthRoleEnum.Ban;
  const isComunityAccess = () =>
    role === AuthRoleEnum.Admin ||
    role === AuthRoleEnum.Editor ||
    role === AuthRoleEnum.Moderator ||
    role === AuthRoleEnum.Influencer ||
    role === AuthRoleEnum.User;

  const mainCheck = (page: Page, role: AuthRole | null) => {
    if (isComunityAccess()) {
      console.log('Access granted for community.');
      return { isAccess: true, page, role };
    } else if (isGuest()) {
      console.log('Access granted for guest.');
      return { isAccess: true, page, role };
    } else if (isBanned()) {
      console.log('Access denied: user is banned.');
      return { isAccess: false, page, role };
    } else return { isAccess: false, page, role: null };
  };

  switch (page) {
    case 'admin':
    case 'dashboard':
    case 'articles':
    case 'article-details':
    case 'create-article':
    case 'edit-article':
      return mainCheck(page, role);

    default:
      // console.log('Access denied: default case.');
      return { isAccess: false, page, role };
  }
};
