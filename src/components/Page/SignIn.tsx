import { useState, useTransition } from 'react';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
// import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';
import Button from '../Button/Button';
import { InputEvent } from '@/src/types';
import FormDivider from '../Form/FormDivider';
import SignInGoogleButton from '../Button/SignInGoogleButton';
import InfoTextLinkBlock from '../Form/InfoTextLinkBlock';

const SignIn = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: '' as string });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isPending) return;
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
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
              <div style={{ position: 'relative' }}>
                <input
                  className={`default-input ${error ? 'error' : ''}`}
                  type="email"
                  maxLength={320}
                  placeholder="Email Address"
                  onChange={(event: InputEvent) =>
                    setFormData({ email: event.target.value })
                  }
                  disabled={isPending}
                  required
                />

                {error && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '-1rem',
                      fontSize: 10,
                      color: 'red',
                    }}
                    className="error-message"
                  >
                    {error}
                  </span>
                )}
              </div>

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
