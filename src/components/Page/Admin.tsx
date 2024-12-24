/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react';
import useUserInfo from '@/src/hooks/useUserInfo';
import LoaderBlock from '@/src/components/LoaderBlock';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import AllUsersInfo from '../Admin/AllUsersInfo';

const Admin = () => {
  const { userInfo } = useUserInfo();
  const session = useSession();

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
        </div>
      </Section>

      <Section className={'main-final-section-zero'}>{null}</Section>
    </Main>
  );
};

export default Admin;
