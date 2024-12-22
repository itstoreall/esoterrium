/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { User } from 'next-auth';
// import useNotes from '@/src/hooks/useNotes';
import useUserInfo from '@/src/hooks/useUserInfo';
// import useUserRole from '@/src/hooks/useUserRole';
// import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
// import { AuthRoleEnum } from '@/src/enum';
// import AccountUserInfo from '@/src/components/AccountUserInfo';
import LoaderBlock from '@/src/components/LoaderBlock';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
// import { getAllUsers } from '@/src/lib/auth/getAllUsersServerAction';
import AllUsersInfo from '../Admin/AllUsersInfo';
// import { UserData } from '@/src/types';

// export type Acc = {
//   userRole: AuthRoleEnum | undefined;
//   handleUserRole: () => Promise<void>;
//   isAdminRole: () => boolean;
// };

// const initRole = AuthRoleEnum.Guest;

const Admin = () => {
  // const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(initRole);

  // const [name, setName] = useState('');
  // const [users, setUsers] = useState<UserData[]>([]);

  const { userInfo } = useUserInfo();
  const session = useSession();
  // const acc = useUserRole();

  // const handleUserName = async (user: User) => {
  //   const { name: userName, email } = user;
  //   if (userName) {
  //     setName(userName);
  //   } else if (!userName && email) {
  //     const emailName = email.split('@')[0];
  //     session.update({ name: emailName });
  //   }
  // };

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

  // useEffect(() => {
  //   const user = session.data?.user;
  //   if (user?.id) {
  //     // setUserId(user.id);
  //     handleUserName(user);
  //   }
  // }, [session]);

  // useEffect(() => {
  //   getAllUsers().then((users) => users && setUsers(users));
  // }, []);

  // useEffect(() => {
  //   getAllUsers().then((fetchedUsers) => {
  //     if (fetchedUsers) setUsers(fetchedUsers);
  //   });
  // }, []);

  // console.log('users:', users);

  // ---

  if (!userInfo || !session.data?.user)
    return <LoaderBlock className={'black-loader-block'} />;

  return (
    <Main className={'admin-page-main'}>
      <Section className={'main-hero-section'}>
        <Title tag="h2" className="page-main-title color-light" text="Admin" />
      </Section>

      <Section className={'admin-section'}>
        <div className="admin-account-block">
          <AllUsersInfo />
          <AllUsersInfo />
          <AllUsersInfo />
        </div>
      </Section>

      <Section className={'main-final-section-zero'}>{null}</Section>
    </Main>
  );
};

export default Admin;
