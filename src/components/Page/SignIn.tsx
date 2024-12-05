import { useState, useTransition } from 'react';
import { handleEmailSignIn } from '@/src/lib/auth/emailSignInServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Main from '@/src/components/Layout/Main';

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

  return (
    <Main className={'articles-page-main'}>
      <div className="signin-page">
        <div className="signin-card">
          <h2>Sign In</h2>
          <div className="form-container">
            <form className="email-signin-form" onSubmit={handleSubmit}>
              <input
                className="form-input"
                type="email"
                maxLength={320}
                placeholder="Email Address"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ email: event.target.value })
                }
                disabled={isPending}
                required
              />
              <button
                className="submit-button"
                type="submit"
                disabled={isPending}
              >
                Sign in with email
              </button>
            </form>

            <div className="divider">
              <div className="line"></div>
              <span className="or">or</span>
              <div className="line"></div>
            </div>

            <div className="social-logins">
              <button
                className="google"
                onClick={() => handleGoogleSignIn('dashboard')}
                disabled={isPending}
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default SignIn;
