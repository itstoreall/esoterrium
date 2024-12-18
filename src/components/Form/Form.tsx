import { FormEvent } from '@/src/types';

type FormProps = {
  className?:
    | 'article-create-form'
    | 'article-details-comments-add-form'
    | 'article-details-comments-edit-form';
  handleSubmit: (event: FormEvent) => void;
  children: React.ReactNode;
  isPending?: boolean;
};

const Form = (props: FormProps) => {
  const { className, handleSubmit, children, isPending } = props;

  return (
    <form className={`default-form ${className}`} onSubmit={handleSubmit}>
      {children}
      {isPending && <p>Loading...</p>}
    </form>
  );
};

export default Form;
