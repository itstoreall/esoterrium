import { ChildrenProps } from '@/src/types';

type SectionProps = ChildrenProps & {
  className?: 'home-section' | 'dashboard-section';
};

const Section = ({ children, className }: SectionProps) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export default Section;
