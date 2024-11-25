import { useState } from 'react';
import Button from '@/src/components/Button/Button';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';

type Props = {
  className?: string;
  title: string;
  disabled?: boolean;
};

const SignOutButton = ({ className, title, disabled = false }: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    handleSignOut();
  };

  return (
    <Button
      className={`signout-button ${className}`}
      clickContent={handleClick}
      disabled={disabled || isDisabled}
    >
      {title}
    </Button>
  );
};

export default SignOutButton;
