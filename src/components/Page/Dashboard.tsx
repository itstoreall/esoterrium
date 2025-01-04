/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import useNotes from '@/src/hooks/useNotes';
import useUserInfo from '@/src/hooks/useUserInfo';
import useUserRole from '@/src/hooks/useUserRole';
// import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
// import { AuthRoleEnum } from '@/src/enum';
import AccountUserInfo from '@/src/components/AccountUserInfo';
import AccountNotes from '@/src/components/AccountNotes';
import LoaderBlock from '@/src/components/LoaderBlock';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
// import Container from '../Container';

// export type Acc = {
//   userRole: AuthRoleEnum | undefined;
//   handleUserRole: () => Promise<void>;
//   isAdminRole: () => boolean;
// };

// const initRole = AuthRoleEnum.Guest;

const Dashboard = () => {
  // /*
  // const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(initRole);
  const [name, setName] = useState('');

  const { notesText, handleNotesChange, clearNotes } = useNotes();
  const { userInfo } = useUserInfo();
  const session = useSession();
  const acc = useUserRole();

  const handleUserName = async (user: User) => {
    const { name: userName, email } = user;
    if (userName) {
      setName(userName);
    } else if (!userName && email) {
      const emailName = email.split('@')[0];
      session.update({ name: emailName });
    }
  };

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

  // */

  return (
    <Main className={'dashboard-page-main'}>
      {/* <Section className={'main-hero-section'}>{null}</Section> */}

      {/* <Container className="dashboard-main-content-container"> */}
      {/* <Section className={'main-heading-section'}>
        <Title
          tag="h2"
          className="page-main-title color-light"
          text="Аккаунт"
        />
      </Section> */}

      <Section className={'main-heading-section first-element'}>
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
    </Main>
  );
};

export default Dashboard;
