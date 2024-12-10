import Link from 'next/link';
import Button from '@/src/components/Button/Button';
import { ArticleData } from '@/src/types';

type Props = {
  articles: ArticleData[];
};

const AdminPanelArticles = ({ articles }: Props) => {
  const privateAccess = [];
  const publicAccess = [];
  const drafts = [];

  for (let i = 0; i < articles.length; i++) {
    if (!articles[i].isPublished) {
      drafts.push(articles[i]);
    } else if (articles[i].access === 'private') {
      privateAccess.push(articles[i]);
    } else publicAccess.push(articles[i]);
  }

  return (
    <div className="admin-panel admin-panel-articles">
      <div className="admin-panel-articles-number-box-content">
        {/* <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">{'Всего'}</span>
          <span className="admin-panel-articles-number-value">
            {articles.length || 0}
          </span>
        </div> */}

        {/* <span className="admin-panel-articles-number-box-divider" /> */}

        <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">
            {'Публичные'}
          </span>
          <span className="admin-panel-articles-number-value">
            {publicAccess.length}
          </span>
        </div>

        <span className="admin-panel-articles-number-box-divider" />

        <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">
            {'Сообщество'}
          </span>
          <span className="admin-panel-articles-number-value">
            {privateAccess.length}
          </span>
        </div>

        <span className="admin-panel-articles-number-box-divider" />

        <div className="admin-panel-articles-number-box">
          <span className="admin-panel-articles-number-title">{'Проекты'}</span>
          <span className="admin-panel-articles-number-value">
            {drafts.length}
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
