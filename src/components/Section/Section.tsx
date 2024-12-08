import { ChildrenProps } from '@/src/types';

type SectionProps = ChildrenProps & {
  className?:
    | 'main-hero-section'
    | 'home-section'
    | 'dashboard-section'
    | 'readable-content-section'
    | 'main-final-section';
};

const Section = ({ children, className }: SectionProps) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export default Section;
