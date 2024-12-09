import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLatestArticleIdx } from '@/src/lib/mongoose/getLatestArticleIdxServerAction';
import { createArticle } from '@/src/services/articleService';
import Main from '@/src/components/Layout/Main';
import { useSession } from 'next-auth/react';

// const defaultImage = 'https://res.cloudinary.com/dsxdnz1hq/image/upload/v1732806735/cld-sample-2.jpg';

const defaultAuthor = 'Mila';

const CreateArticle = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: defaultAuthor,
    tags: ['magic'],
    views: [],
  });

  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session.data?.user?.id) return;
    try {
      const latestArticle = await getLatestArticleIdx();
      const idx = latestArticle ? latestArticle.idx + 1 : 1;
      const res = await createArticle({
        ...form,
        views: [session.data?.user?.id],
        idx,
      });
      if (res) {
        alert('Статья успешно создана! Теперь ее можно опубликовать.');
        router.push('/articles');
      }
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <Main className={'create-article-page-main'}>
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <button type="submit">Create Article</button>
      </form>
    </Main>
  );
};

export default CreateArticle;

/* 
--- Update Articles:
import { useQueryClient } from '@tanstack/react-query';
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['articles'] });
*/
