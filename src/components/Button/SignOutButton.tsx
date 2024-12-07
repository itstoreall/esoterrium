import { ReactNode, useState } from 'react';
import Button from '@/src/components/Button/Button';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';

type Props = {
  className?: string;
  content: ReactNode;
  title?: string;
  disabled?: boolean;
};

const SignOutButton = ({
  className,
  content,
  title,
  disabled = false,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    handleSignOut();
  };

  return (
    <Button
      className={className}
      clickContent={handleClick}
      title={title}
      isDisable={disabled || isDisabled}
    >
      {content}
    </Button>
  );
};

export default SignOutButton;
