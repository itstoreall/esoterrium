// import Link from 'next/link';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';
import EditArticleForm from '@/src/components/Form/EditArticleForm';

const EditArticle = ({ article }: { article: ArticleData }) => {
  return (
    <Main className={'edit-article-page-main'}>
      {/* <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link href="/articles">
        <button>Articles</button>
      </Link>
      <Link href={`/articles/${article._id}`}>
        <button>Cancel</button>
      </Link> */}

      <h1>Edit Article</h1>
      <EditArticleForm article={JSON.parse(JSON.stringify(article))} />
    </Main>
  );
};

export default EditArticle;
