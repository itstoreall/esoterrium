import { FiX } from 'react-icons/fi';

type Props = {
  adminfilterValue: string;
  categoryTag: string;
  topicTag: string;
  resetFilter: (label: string) => void;
};

const FilterValueBlock = (props: Props) => {
  const { adminfilterValue, categoryTag, topicTag, resetFilter } = props;

  const adminValue =
    adminfilterValue === 'public'
      ? 'публичные'
      : adminfilterValue === 'private'
      ? 'сообщество'
      : adminfilterValue === 'draft'
      ? 'проекты'
      : '';

  return (
    <div className={'main-filter-value-block'}>
      {adminfilterValue && (
        <span className="main-filter-value">
          <span>{adminValue}</span>
          <FiX size={18} onClick={() => resetFilter('admin')} />
        </span>
      )}
      {categoryTag && (
        <span className="main-filter-value">
          <span>{categoryTag}</span>
          <FiX size={18} onClick={() => resetFilter('category')} />
        </span>
      )}
      {topicTag && (
        <span className="main-filter-value">
          <span>{topicTag}</span>
          <FiX size={18} onClick={() => resetFilter('topic')} />
        </span>
      )}
    </div>
  );
};

export default FilterValueBlock;
