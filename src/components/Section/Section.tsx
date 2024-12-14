import { ChildrenProps } from '@/src/types';

type SectionProps = ChildrenProps & {
  className?:
    | 'main-hero-section'
    | 'home-section'
    | 'blue-lotus-home-section'
    | 'dashboard-section'
    | 'sidebar-title-section'
    | 'article-details-section'
    | 'readable-content-section'
    | 'article-details-comments-section'
    | 'main-final-section';
};

const Section = ({ children, className }: SectionProps) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export default Section;
