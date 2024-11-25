import { useState } from 'react';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Button from '@/src/components/Button/Button';

type Props = {
  className: string;
  title: string;
  disabled?: boolean;
};

const SignInGoogleButton = ({ className, title, disabled = false }: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    handleGoogleSignIn('dashboard');
  };

  return (
    <Button
      className={`signin-google-button ${className}`}
      clickContent={handleClick}
      disabled={disabled || isDisabled}
    >
      {title}
    </Button>
  );
};

export default SignInGoogleButton;
