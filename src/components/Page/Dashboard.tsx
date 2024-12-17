/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import useNotes from '@/src/hooks/useNotes';
import useUserInfo from '@/src/hooks/useUserInfo';
import useUserRole from '@/src/hooks/useUserRole';
// import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRoleEnum } from '@/src/enum';
import AccountUserInfo from '@/src/components/AccountUserInfo';
import AccountNotes from '@/src/components/AccountNotes';
import LoaderBlock from '@/src/components/LoaderBlock';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';

export type Acc = {
  userRole: AuthRoleEnum | undefined;
  handleUserRole: () => Promise<void>;
  isAdminRole: () => boolean;
};

// const initRole = AuthRoleEnum.Guest;

const Dashboard = () => {
  // const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(initRole);
  const [name, setName] = useState('');

  const { notesText, handleNotesChange, clearNotes } = useNotes();
  const { userInfo } = useUserInfo();
  const acc: Acc = useUserRole();
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

  // const changeUserRole = async () => {
  //   if (!userInfo?.id) {
  //     console.error('User ID is missing or invalid:', userInfo?.id);
  //     return;
  //   }
  //   try {
  //     await setUserRole(userInfo?.id, selectedRole);
  //     await acc.handleUserRole();
  //   } catch (error) {
  //     console.error('Failed to update role:', error);
  //   }
  // };

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
            setName={setName}
          />

          <AccountNotes
            notesText={notesText}
            handleNotesChange={handleNotesChange}
            clearNotes={clearNotes}
          />
        </div>
      </Section>

      <Section className={'main-final-section-zero'}>{null}</Section>
    </Main>
  );
};

export default Dashboard;

/*
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
*/
