import { redirect } from 'next/navigation';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import Container from '@/src/components/Container';
import EditArticle from '@/src/components/Page/EditArticle';

type Props = { params: Promise<{ id: string }> };

const EditArticlePage = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const article = await getArticleById(id, 'lean');

    if (!article) {
      throw new Error('Article not found');
    }

    return (
      <Container className={'page-wrapper-container'}>
        <EditArticle article={JSON.parse(JSON.stringify(article))} />
      </Container>
    );
  } catch (error) {
    console.error(`Error editing an article: ${error}`);
    redirect(`/articles/${id}/error`);
  }
};

export default EditArticlePage;
