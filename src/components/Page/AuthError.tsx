import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import InfoStatusBlock from '@/src/components/Form/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/Form/InfoTextLinkBlock';

const ErrorSuccess = () => {
  return (
    <Main className={'signin-page-main'}>
      <Container className="form-wrapper-container">
        <InfoStatusBlock status="error" text={'Что-то пошло не так'} />

        <InfoTextLinkBlock
          // text={'Попробуйте '}
          url={'/api/auth/signin'}
          linkTitle={'Повторить еще раз'}
        />
      </Container>
    </Main>
  );
};

export default ErrorSuccess;
