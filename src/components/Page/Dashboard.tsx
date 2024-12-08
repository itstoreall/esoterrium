/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import useUserRole from '@/src/hooks/useUserRole';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRoleEnum } from '@/src/enum';
import { GoSignOut } from 'react-icons/go';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import SignOutButton from '@/src/components/Button/SignOutButton';
import Title from '@/src/components/Layout/Title';

const Dashboard = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  const acc = useUserRole();

  const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(
    AuthRoleEnum.Guest
  );

  const session = useSession();

  const handleUserName = async (user: User) => {
    const { name: userName, email } = user;
    if (userName) {
      setName(userName);
    } else if (!userName && email) {
      const emailName = email.split('@')[0];
      session.update({ name: emailName });
    }
  };

  const handleChangeUserRole = async () => {
    if (!userId) {
      console.error('User ID is missing or invalid:', userId);
      return;
    }
    try {
      await setUserRole(userId, selectedRole);
      await acc.handleUserRole();
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
    acc.handleUserRole();
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
    <Main className={'dashboard-page-main'}>
      <Section className={'main-hero-section'}>
        <Title tag="h2" className="page-main-title" text="Аккаунт" />
      </Section>

      <Section className={'dashboard-section'}>
        <SignOutButton
          className="nav-link-react-icon-button"
          content={<GoSignOut size={20} />}
          title={'Вьіход'}
        />

        <div>
          <p>Role: {acc.userRole}</p>
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

          <button
            className="update-field-button"
            onClick={handleChangeUserRole}
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
      </Section>

      <Section className={'main-final-section'}>{null}</Section>
    </Main>
  );
};

export default Dashboard;
