import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticle } from '@/src/lib/mongoose/getLatestArticleServerAction';
import trimLongWord from '@/src/utils/trimLongWord';
import { ArticleData } from '@/src/types';
import { config } from '@/src/config';
import ProgressLoader from '@/src/components/ProgressBlock';

// type Props = {
//   latestArticle: ArticleData | null;
// };

const SidebarLatestArticleBlock = () => {
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);
  const [latestArticle, setLatestArticle] = useState<ArticleData | null>();

  const path = usePathname();

  const handleItemClick = (articleId: string) => {
    if (path.split('/')[2] === latestArticle?._id) return;
    setLoadingArticleId(articleId);
    setTimeout(() => {
      setLoadingArticleId(null);
    }, 5000);
  };

  useEffect(() => {
    getLatestArticle().then((art) =>
      setLatestArticle(JSON.parse(JSON.stringify(art)) ?? null)
    );
  }, [path]);

  // console.log('latestArticle:', latestArticle);
  // console.log('path:', path);

  return latestArticle ? (
    <div
      className="sidebar-latest-article-block"
      onClick={() => handleItemClick(latestArticle._id)}
    >
      {/* <div className={'sidebar-latest-article-content'}> */}
      <Link href={`/articles/${latestArticle._id}`}>
        <div className="image-block article-list-item-thumb">
          <Image
            src={latestArticle.image || config.defaultImageUrl}
            className="article-list-item-image"
            fill
            priority={true}
            alt={latestArticle.title}
          />
        </div>
        {loadingArticleId !== latestArticle._id ? (
          <h3 className="article-list-item-title">
            {trimLongWord(latestArticle.title, 20, 15, 5)}
          </h3>
        ) : (
          <div className="article-list-item-progress-loader-block">
            <ProgressLoader duration={2000} />
          </div>
        )}
      </Link>
      {/* </div> */}
    </div>
  ) : (
    <div className="sidebar-latest-article-block latest-article-loader-block">
      ...
    </div>
  );
};

export default SidebarLatestArticleBlock;
