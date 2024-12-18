import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getLatestArticleIdx } from '@/src/lib/mongoose/getLatestArticleIdxServerAction';
import { createArticle } from '@/src/services/articleService';
import SimpleInput from '@/src/components/Form/SimpleInput';
import Textarea from '@/src/components/Form/Textarea';
import Title from '@/src/components/Layout/Title';
import Select from '@/src/components/Form/Select';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import Form from '@/src/components/Form/Form';
import Button from '@/src/components/Button';

// const defaultImage = 'https://res.cloudinary.com/dsxdnz1hq/image/upload/v1732806735/cld-sample-2.jpg';

const initState = {
  image: '',
  title: '',
  content: '',
  author: '',
  tags: [] as string[],
  views: [],
};

const selectOptions = [
  'Нумерология',
  'Астрология',
  'Матрица',
  'Практики',
  'Книги',
];

const CreateArticle = () => {
  const [form, setForm] = useState(initState);
  const [isSelectError, setIsSelectError] = useState(false);

  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tags.length) {
      handleSelectError(true);
      alert('А Рубрику выбрать?');
      return;
    }
    if (!session.data?.user?.id || !session.data?.user?.name) return;
    if (!confirm('Данная статья будет сохранена в проекты!')) return;
    try {
      const latestArticle = await getLatestArticleIdx();
      const idx = latestArticle ? latestArticle.idx + 1 : 1;
      const res = await createArticle({
        ...form,
        idx,
        author: session.data?.user?.name,
        views: [session.data?.user?.id],
      });
      if (res) {
        alert('Статья успешно создана! Теперь ее можно опубликовать.');
        router.push('/articles');
      }
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  // console.log('form:', form);

  const handleFormContent = (text: string) => {
    setForm({ ...form, content: text });
  };

  const handleSelectError = (is: boolean) => {
    setIsSelectError(is);
  };

  const handleTagSelect = (selectedTag: string) => {
    if (isSelectError) handleSelectError(false);
    setForm((prevForm) => ({
      ...prevForm,
      tags: [...new Set([...prevForm.tags, selectedTag])],
    }));
  };

  const handleReset = () => {
    if (!confirm('Вся введенная информация будет удалена!')) return;
    setForm(initState);
  };

  return (
    <Main className={'create-article-page-main'}>
      <Section className={'main-hero-section'}>
        <Title tag="h2" className="page-main-title" text="Новая статья" />
      </Section>

      <Section className="article-create-form-section">
        <Form className="article-create-form" handleSubmit={handleSubmit}>
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder="Изображение (url)"
            handleChange={(url) => setForm({ ...form, image: url })}
          />
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder="Название статьи"
            handleChange={(text) => setForm({ ...form, title: text })}
            isRequire
          />
          <Select
            className="article-create-form-select light-select-theme"
            options={selectOptions}
            placeholder="Рубрика"
            onSelect={handleTagSelect}
            isError={isSelectError}
          />
          <Textarea
            className="article-create-form-textarea"
            placeholder="Текст статьи"
            value={form.content}
            handleChangeValue={handleFormContent}
          />
          <div className="article-create-form-button-block">
            <Button type="submit">Сохранить</Button>
            <Button type="button" clickContent={handleReset}>
              Очистить
            </Button>
          </div>
        </Form>
      </Section>
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
