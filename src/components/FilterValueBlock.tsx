import { FiX } from 'react-icons/fi';

type Props = {
  adminfilterValue: string;
  tagFilterValue: string;
  resetFilter: (label: string) => void;
};

const FilterValueBlock = (props: Props) => {
  const { adminfilterValue, tagFilterValue, resetFilter } = props;

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
      {tagFilterValue && (
        <span className="main-filter-value">
          <span>{tagFilterValue}</span>
          <FiX size={18} onClick={() => resetFilter('tag')} />
        </span>
      )}
    </div>
  );
};

export default FilterValueBlock;
