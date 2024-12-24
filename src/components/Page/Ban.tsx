import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import InfoStatusBlock from '@/src/components/Form/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/Form/InfoTextLinkBlock';

const Ban = () => {
  return (
    <Main className={'ban-page-main'}>
      <Container className="auth-form-wrapper-container">
        <InfoStatusBlock status="warning" text={'Ваш доступ ограничен'} />

        <InfoTextLinkBlock
          text={'Обратитесь к администратору в '}
          url={'https://www.facebook.com/groups/754123990135762'}
          linkTitle={'Facebook'}
        />

        <InfoTextLinkBlock
          text={'Перейти на '}
          url={'/'}
          linkTitle={'Главную'}
        />
      </Container>
    </Main>
  );
};

export default Ban;
