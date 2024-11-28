'use client';

import { useState } from 'react';
import { useArticles } from '@/src/hooks/useArticles';
import { createArticle } from '@/src/services/articleService';
import { useQueryClient } from '@tanstack/react-query';
import { ArticleData } from '@/src/types';

const ArticlesPage = () => {
  const queryClient = useQueryClient();
  const { data: articles, isLoading, isError } = useArticles();
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    image: '444',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle(form);
      setForm({
        title: '',
        content: '',
        author: '',
        image: '444',
      });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching articles</p>;

  console.log('articles:', articles);

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
        {articles.map((article: ArticleData) => (
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
