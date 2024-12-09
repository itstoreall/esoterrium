import Link from 'next/link';
import Button from '@/src/components/Button/Button';

type Props = {
  articlesNumber: number;
};

const AdminPanelArticles = ({ articlesNumber }: Props) => {
  console.log('articlesNumber', articlesNumber);

  return (
    <div className="admin-panel admin-panel-article-handler">
      <div className="admin-panel-articles-number-box-wrapper">
        <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">{'Всего'}</span>
          <span className="admin-panel-articles-number-value">
            {3209}
            {/* {articlesNumber} */}
          </span>
        </div>

        <span className="admin-panel-articles-number-box-divider" />

        <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">
            {'Опубликовано'}
          </span>
          <span className="admin-panel-articles-number-value">
            {3187}
            {/* {articlesNumber} */}
          </span>
        </div>
      </div>

      <Link href="/articles/create">
        <Button className="admin-panel-text-button">Добавить</Button>
      </Link>
    </div>
  );
};

export default AdminPanelArticles;
