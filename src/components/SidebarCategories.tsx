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
};

export default SidebarCategories;
