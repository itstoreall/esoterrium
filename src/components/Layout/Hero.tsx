import { ChildrenProps } from '@/src/types';

type Props = ChildrenProps & { className?: 'home-hero-block' };

const Hero = ({ children, className }: Props) => {
  return <div className={`hero-block ${className}`}>{children}</div>;
};

export default Hero;
