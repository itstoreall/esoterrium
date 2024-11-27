'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useArticles } from '@/src/hooks/useArticles';
import { createArticle } from '@/src/services/articleService';
import { useState } from 'react';

const ArticlesPage = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    image: '444',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createArticle(form);
    setForm({ title: '', content: '', author: '', image: '444' });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching articles</p>;

  return (
    <div>
      <h1>Articles</h1>
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
      <ul>
        {articles.map((article: any) => (
          <li key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
