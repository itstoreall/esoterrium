'use client';

// import { useState, useTransition } from 'react';
// import { useRouter } from 'next/navigation';
// import { AxiosError } from 'axios';
// import { updateArticle } from '@/src/services/articleService';
// import { ArticleData } from '@/src/types';

// type EditArticleFormProps = {
//   article: ArticleData;
// };

// type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// const config = {
//   confirmMsg:
//     'Эта публикация станет общедоступной! Повторно изменить доступ будет невозможно. Также, вы не сможете ее удалить (только редактировать)',
//   alertSuccess:
//     'Изменения успешно сохранены! Контент обновится в течение нескольких минут.',
//   alertError: 'An error occurred while editing the article!',
// };

// const EditArticleForm = ({ article }: EditArticleFormProps) => {
const EditArticleForm = () => {
  // const [isPending, startTransition] = useTransition();
  // const [error, setError] = useState<string | null>(null);
  // const [formData, setFormData] = useState({
  //   title: article.title,
  //   content: article.content,
  //   image: article.image ?? '',
  //   tags: article.tags.join(', '), // Tags as a comma-separated string
  // });
  // const router = useRouter();
  // const handleChange = (e: InputEvent) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   const tags = formData.tags.split(',').map((tag) => tag.trim());
  //   const payload = { ...formData, tags };
  //   try {
  //     if (isPending) return;
  //     startTransition(async () => {
  //       const res = await updateArticle(article._id, payload);
  //       if (res && res._id === article._id) {
  //         alert(config.alertSuccess);
  //         router.push('/articles');
  //       }
  //     });
  //   } catch (err: unknown) {
  //     setError((err as AxiosError).message);
  //   }
  // };
  return <></>;
  //   // <form onSubmit={handleSubmit}>
  //   <>
  //     <div>
  //       <label htmlFor="title">Title</label>
  //       <input
  //         type="text"
  //         id="title"
  //         name="title"
  //         value={formData.title}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="content">Content</label>
  //       <textarea
  //         id="content"
  //         name="content"
  //         value={formData.content}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="image">Image URL</label>
  //       <input
  //         type="text"
  //         id="image"
  //         name="image"
  //         value={formData.image}
  //         onChange={handleChange}
  //         // required
  //       />
  //     </div>
  //     {/* <div>
  //       <label htmlFor="author">Author</label>
  //       <input
  //       type="text"
  //       id="author"
  //       name="author"
  //       value={formData.author}
  //       onChange={handleChange}
  //       required
  //       />
  //       </div> */}
  //     <div>
  //       <label htmlFor="tags">Tags (comma-separated)</label>
  //       <input
  //         type="text"
  //         id="tags"
  //         name="tags"
  //         value={formData.tags}
  //         onChange={handleChange}
  //       />
  //     </div>
  //     {/* <div>
  //       <label>
  //       <input
  //       type="checkbox"
  //       name="isPublished"
  //       checked={formData.isPublished}
  //       onChange={() =>
  //       setFormData((prev) => ({
  //         ...prev,
  //         isPublished: !prev.isPublished,
  //         }))
  //         }
  //         />
  //         Published
  //         </label>
  //         </div> */}
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     <button type="submit" disabled={isPending}>
  //       {isPending ? 'Updating...' : 'Update Article'}
  //     </button>
  //   </>
  //   // </form>
  // );
};

export default EditArticleForm;
