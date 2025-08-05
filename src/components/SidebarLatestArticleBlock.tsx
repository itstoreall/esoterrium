import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticle } from '@/src/lib/mongoose/getLatestArticleServerAction';
import trimLongWord from '@/src/utils/trimLongWord';
import { ArticleData } from '@/src/types';
import { config } from '@/src/config';
import ProgressLoader from '@/src/components/ProgressBlock';
import Title from '@/src/components/Layout/Title';
import Section from '@/src/components/Section';

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
    getLatestArticle().then((art) => {
      if (art) {
        setLatestArticle(JSON.parse(JSON.stringify(art)));
      } else {
        setLatestArticle(null);
      }
    });
  }, []);

  // console.log('latestArticle:', latestArticle?._id);

  return (
    <>
      <Section className="sidebar-heading-section first-element">
        <Title
          tag="h3"
          text={latestArticle ? 'Новинка' : 'Сообщество'}
          className="page-main-title"
        />
      </Section>

      {latestArticle ? (
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
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <>
          {latestArticle !== null ? (
            <div className="sidebar-latest-article-block latest-article-loader-block">
              ...
            </div>
          ) : (
            <div className="sidebar-latest-article-block">
              <Link href={config.facebookCommunity} target="_blank">
                <div className="image-block article-list-item-thumb">
                  <Image
                    src={config.communityImage}
                    className="article-list-item-image"
                    fill
                    priority={true}
                    alt={'Сообщество Esoterrium в Facebook'}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="article-list-item-title">
                  {trimLongWord('Сообщество Esoterrium в Facebook', 20, 15, 5)}
                </h3>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SidebarLatestArticleBlock;
