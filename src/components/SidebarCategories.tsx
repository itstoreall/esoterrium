import { CategoryEnum } from '@/src/enum';

type Props = {
  handleCategory: (category: string) => void;
};

const SidebarCategories = ({ handleCategory }: Props) => {
  return (
    <ul className="article-sidebar-category-list">
      {Object.values(CategoryEnum).map((category) => (
        <li
          key={category}
          className="article-sidebar-category-list-item"
          onClick={() => handleCategory(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
  /*
  return (
    <ul className="article-details-sidebar-category-list">
      <li style={{ marginBottom: '1rem' }}>{CategoriesEnum.Numerology}</li>
      <li style={{ marginBottom: '1rem' }}>{CategoriesEnum.Astrology}</li>
      <li style={{ marginBottom: '1rem' }}>{CategoriesEnum.Matrix}</li>
      <li style={{ marginBottom: '1rem' }}>{CategoriesEnum.Practices}</li>
      <li style={{ marginBottom: '1rem' }}>{CategoriesEnum.Books}</li>
    </ul>
  );
  */
};

export default SidebarCategories;
