/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
// import { GoSignOut } from 'react-icons/go';
import useUserRole from '@/src/hooks/useUserRole';
import useUserInfo from '@/src/hooks/useUserInfo';
// import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
// import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
// import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
// import convertDate from '@/src/utils/convertDate';
// import trimString from '@/src/utils/trimString';
import { AuthRoleEnum } from '@/src/enum';
// import SignOutButton from '@/src/components/Button/SignOutButton';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import LoaderBlock from '@/src/components/LoaderBlock';
// import Button from '@/src/components/Button';
// import copyToClipboard from '@/src/utils/copyToClipboard';
import AccountNotes from '../AccountNotes';

import AccountUserInfo from '@/src/components/AccountUserInfo';
import useNotes from '@/src/hooks/useNotes';

export type Acc = {
  userRole: AuthRoleEnum | undefined;
  handleUserRole: () => Promise<void>;
  isAdminRole: () => boolean;
};

const Dashboard = () => {
  // const [isAccountLinked, setIsAccountLinked] = useState(false);
  // const [isEditNickname, setIsEditNickname] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [name, setName] = useState('');

  const { notesText, handleNotesChange, clearNotes } = useNotes();

  // const getLSNotes = () => localStorage.getItem(lsKey) || '';

  // const [notesText, setNotesText] = useState(getLSNotes() || '');

  const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(
    AuthRoleEnum.Guest
  );

  const { userInfo } = useUserInfo();
  const session = useSession();
  const acc: Acc = useUserRole();

  const handleUserName = async (user: User) => {
    const { name: userName, email } = user;
    if (userName) {
      setName(userName);
    } else if (!userName && email) {
      const emailName = email.split('@')[0];
      session.update({ name: emailName });
    }
  };

  // const handleUserName = async (user: User) => {
  //   const { name: userName, email } = user;
  //   if (userName) return;
  //   if (!userName && email) {
  //     const emailName = email.split('@')[0];
  //     session.update({ name: emailName });
  //   }
  //   /*
  //   if (userName) {
  //     setName(userName);
  //   } else if (!userName && email) {
  //     const emailName = email.split('@')[0];
  //     session.update({ name: emailName });
  //   }
  //   */
  // };

  const changeUserRole = async () => {
    if (!userInfo?.id) {
      console.error('User ID is missing or invalid:', userInfo?.id);
      return;
    }
    try {
      await setUserRole(userInfo?.id, selectedRole);
      await acc.handleUserRole();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  // const updateName = () => {
  //   session.update({ name });
  //   setIsEditNickname(false);
  // };

  // const handleCopyValue = (val: string) => {
  //   setIsCopied(true);
  //   copyToClipboard(val);
  //   setTimeout(() => setIsCopied(false), 300);
  // };

  // useEffect(() => {
  //   const accountLinkStatus = async () => {
  //     try {
  //       const accountLinkStatus = await getAccountLinkStatus();
  //       setIsAccountLinked(accountLinkStatus);
  //     } catch (error) {
  //       console.error('Failed to get account link status:', error);
  //     }
  //   };
  //   acc.handleUserRole();
  //   accountLinkStatus();
  // }, []);

  useEffect(() => {
    const user = session.data?.user;
    if (user?.id) {
      // setUserId(user.id);
      handleUserName(user);
    }
  }, [session]);

  // ---

  if (!userInfo || !session.data?.user)
    return <LoaderBlock className={'black-loader-block'} />;

  const copyStyle = isCopied ? 'copied' : '';

  return (
    <Main className={'dashboard-page-main'}>
      <Section className={'main-hero-section'}>
        <Title
          tag="h2"
          className="page-main-title color-light"
          text="Аккаунт"
        />
      </Section>

      <Section className={'dashboard-section'}>
        <div className="user-account-block">
          <AccountUserInfo
            acc={acc}
            userInfo={userInfo}
            name={name}
            copyStyle={copyStyle}
            setIsCopied={setIsCopied}
            setName={setName}
          />

          <AccountNotes
            notesText={notesText}
            handleNotesChange={handleNotesChange}
            clearNotes={clearNotes}
          />
        </div>

        {/* {acc.userRole === AuthRoleEnum.Influencer && ( */}
        {acc.userRole === AuthRoleEnum.Admin && (
          <>
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

              <button className="update-field-button" onClick={changeUserRole}>
                Update Role
              </button>
            </div>
          </>
        )}
      </Section>

      <Section className={'main-final-section'}>{null}</Section>
    </Main>
  );
};

export default Dashboard;
