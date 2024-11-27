import mongoose from 'mongoose';
import EditArticleForm from '@/src/components/Form/EditArticleForm';
import { Article } from '@/src/lib/mongoose/models/Article';
import { redirect } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

// Fetch the article on the server side
const getArticleById = async (id: string) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
  return await Article.findById(id).lean();
};

const EditArticlePage = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const article = await getArticleById(id); // 67461eca11d202070efa0c33

    if (!article) {
      throw new Error('Article not found');
    }

    return (
      <div>
        <h1>Edit Article</h1>
        <EditArticleForm article={JSON.parse(JSON.stringify(article))} />
      </div>
    );
  } catch (error) {
    console.error(`Error editing an article: ${error}`);
    redirect(`/articles/${id}/error`);
  }
};

export default EditArticlePage;
