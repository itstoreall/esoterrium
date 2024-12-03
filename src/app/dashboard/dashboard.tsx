/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import Link from 'next/link';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRoleEnum } from '@/src/enum';
import SignOutButton from '@/src/components/Button/SignOutButton';

export const DashboardPage: React.FC = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<AuthRoleEnum>();

  const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(
    AuthRoleEnum.Guest
  );

  const session = useSession();

  const handleUserName = async (user: User) => {
    const { name: userName, email } = user;
    if (userName) {
      setName(userName);
    } else if (userName === null && email) {
      const emailName = email.split('@')[0];
      session.update({ name: emailName });
    }
  };

  const handleUserRole = async () => {
    const role = await getUserRole();
    if (role) {
      setRole(role as AuthRoleEnum);
    }
  };

  const handleChangeUserRole = async () => {
    if (!userId) {
      console.error('User ID is missing or invalid:', userId);
      return;
    }
    try {
      await setUserRole(userId, selectedRole);
      await handleUserRole();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  useEffect(() => {
    const accountLinkStatus = async () => {
      try {
        const accountLinkStatus = await getAccountLinkStatus();
        setIsAccountLinked(accountLinkStatus);
      } catch (error) {
        console.error('Failed to get account link status:', error);
      }
    };
    handleUserRole();
    accountLinkStatus();
  }, []);

  useEffect(() => {
    const user = session.data?.user;
    if (user?.id) {
      setUserId(user.id);
      handleUserName(user);
    }
  }, [session]);

  return (
    <div>
      <SignOutButton title={'Sign Out'} />
      <Link href="/articles">
        <button>Articles</button>
      </Link>

      <div>
        <p>Role: {role}</p>
      </div>

      <div className="name">{name}</div>

      <div className="field-input-container">
        <input
          className="field-input"
          type="text"
          placeholder={'Enter name'}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button
          className="update-field-button"
          onClick={() => session.update({ name })}
        >
          Update Name
        </button>

        <select
          value={selectedRole}
          onChange={(event) =>
            setSelectedRole(event.target.value as AuthRoleEnum)
          }
          className="field-input"
        >
          {Object.values(AuthRoleEnum).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button className="update-field-button" onClick={handleChangeUserRole}>
          Update Role
        </button>
      </div>

      <button
        className="link-account-button"
        onClick={
          isAccountLinked
            ? async () => {
                await unlinkGoogleAccount().then(() => {
                  setIsAccountLinked(false);
                });
              }
            : async () => {
                await handleGoogleSignIn('dashboard').then(() => {
                  setIsAccountLinked(true);
                });
              }
        }
      >
        {isAccountLinked
          ? 'Disconnect Google Account'
          : 'Connect Google Account'}
      </button>
    </div>
  );
};
