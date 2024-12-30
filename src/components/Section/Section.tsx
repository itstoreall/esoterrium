import { ChildrenProps } from '@/src/types';

type SectionProps = ChildrenProps & {
  className?:
    | 'admin-section'
    | 'main-hero-section'
    | 'home-section'
    | 'blue-lotus-home-section'
    | 'public-articles-home-section'
    | 'dashboard-section'
    | 'sidebar-title-section'
    | 'article-create-form-section'
    | 'article-edit-form-section'
    | 'article-details-section'
    | 'article-details-comments-section'
    | 'readable-content-section'
    | 'main-filter-value-section'
    | 'main-final-section'
    | 'main-final-section-small'
    | 'main-final-section-zero';
  id?: string;
};

const Section = ({ children, className, id }: SectionProps) => {
  return <section className={`section ${className}`} id={id}>{children}</section>;
};

export default Section;
