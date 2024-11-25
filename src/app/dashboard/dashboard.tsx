'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRoleEnum } from '@/src/enum';
import SignOutButton from '@/src/components/Button/SignOutButton';

export const DashboardPage: React.FC = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const session = useSession();

  const handleUserName = async () => {
    const name = await getUserName();
    if (name) {
      setName(name);
    }
  };

  const handleUserRole = async () => {
    const role = await getUserRole();
    if (role) {
      setRole(role);
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
    handleUserName();
    handleUserRole();
    accountLinkStatus();
  }, []);

  return (
    <div>
      <SignOutButton title={'Sign Out'} />

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

        <button
          className="update-field-button"
          onClick={async () => {
            await setUserRole('cm3xcmlg60001w7wc8khhz67w', AuthRoleEnum.Admin);
            await handleUserRole();
          }}
        >
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
