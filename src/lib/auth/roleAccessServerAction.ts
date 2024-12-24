'use server';

import { AuthRoleEnum } from '@/src/enum';
import { getUserRole } from './getUserRoleServerAction';

type Page = 'dashboard';

export const roleAccess = async (page: Page) => {
  const role = await getUserRole();

  // console.log(`Role for ${page}:`, role);

  const isGuest = () => role === AuthRoleEnum.Guest;
  const isBaned = () => role === AuthRoleEnum.Ban;
  const isComunityAccess = () =>
    role === AuthRoleEnum.Admin ||
    role === AuthRoleEnum.Editor ||
    role === AuthRoleEnum.Moderator ||
    role === AuthRoleEnum.Influencer ||
    role === AuthRoleEnum.User;

  switch (page) {
    case 'dashboard':
      if (isComunityAccess() || isGuest()) {
        console.log('Access granted for community or guest.');
        return { isAccess: true, page, role };
      } else if (isBaned()) {
        console.log('Access denied: user is banned.');
        return { isAccess: false, page, role };
      }

    default:
      console.log('Access denied: default case.');
      return { isAccess: false, page, role };
  }
};

/*
export const roleAccess = async (page: Page) => {
  const role = await getUserRole();

  const isGuest = () => role === AuthRoleEnum.Guest;
  const isBaned = () => role === AuthRoleEnum.Ban;
  const isComunityAccess = () =>
    role === AuthRoleEnum.Admin ||
    role === AuthRoleEnum.Editor ||
    role === AuthRoleEnum.Moderator ||
    role === AuthRoleEnum.Influencer ||
    role === AuthRoleEnum.User;

  switch (page) {
    case 'dashboard':
      if (isComunityAccess()) {
        return { isAccess: true, page, role };
      } else if (isGuest()) {
        return { isAccess: true, page, role };
      } else if (isBaned()) {
        return { isAccess: false, page, role };
      }

    default:
      return { isAccess: false, page, role };
  }
};
*/
