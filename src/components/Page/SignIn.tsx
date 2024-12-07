import { useState, useTransition } from 'react';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';
import Button from '@/src/components/Button/Button';
import SimpleInput from '@/src/components/Form/SimpleInput';
import FormDivider from '@/src/components/Form/FormDivider';
import SignInGoogleButton from '@/src/components/Button/SignInGoogleButton';
import InfoTextLinkBlock from '@/src/components/Form/InfoTextLinkBlock';

const SignIn = () => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (value: string) => setInputValue(value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isPending) return;
      startTransition(async () => {
        await handleEmailSignIn(inputValue);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const error = '';
  const isSubmitting = false;

  return (
    <Main className={'signin-page-main'}>
      <Container className="form-wrapper-container">
        <Container className="form-backdrop-container">
          <Title tag={'h3'} className="form-title" text={'Вход в аккаунт'} />

          <Form handleSubmit={handleSubmit}>
            <Container className="form-content-container">
              <SimpleInput
                placeholder="Email Address"
                type="email"
                handleChange={handleInputValue}
                isDisable={isPending}
                isRequire
              />

              <Button
                className="form-button"
                isDisable={isSubmitting || !!error}
                type="submit"
              >
                {isSubmitting ? '...' : 'Войти через почту'}
              </Button>
            </Container>

            <FormDivider />

            <SignInGoogleButton
              className={'sign-in'}
              title={'Войти через Google'}
              disabled={!!error}
            />
          </Form>
        </Container>

        <InfoTextLinkBlock
          text={'Перейти на '}
          url={'/'}
          linkTitle={'Главную'}
        />
      </Container>
    </Main>
  );
};

export default SignIn;
