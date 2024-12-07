import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import InfoStatusBlock from '@/src/components/Form/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/Form/InfoTextLinkBlock';

const AuthSuccess = () => {
  return (
    <Main className={'signin-page-main'}>
      <Container className="auth-form-wrapper-container">
        <InfoStatusBlock status="success" text={'Пожалуйста проверьте почту'} />

        <InfoTextLinkBlock
          text={'Не получили письмо? '}
          url={'/api/auth/signin'}
          linkTitle={'Повторить'}
        />
      </Container>
    </Main>
  );
};

export default AuthSuccess;
