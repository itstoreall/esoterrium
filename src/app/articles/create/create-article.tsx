'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/src/services/articleService';

const defaultImage =
  'https://res.cloudinary.com/dsxdnz1hq/image/upload/v1732806735/cld-sample-2.jpg';
const defaultAuthor = 'Mila';

const CreateArticlePage = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: defaultAuthor,
    image: defaultImage,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createArticle(form);
      console.log('res ---->', res);
      if (res) {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CreateArticlePage;

/* 
--- Update Articles:
import { useQueryClient } from '@tanstack/react-query';
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['articles'] });
*/
