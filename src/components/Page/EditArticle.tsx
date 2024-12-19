'use client';

// import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ArticleData } from '@/src/types';
import { updateArticle } from '@/src/services/articleService';
import SimpleInput from '@/src/components/Form/SimpleInput';
import Textarea from '@/src/components/Form/Textarea';
import Title from '@/src/components/Layout/Title';
import Select from '@/src/components/Form/Select';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import Form from '@/src/components/Form/Form';
import Button from '@/src/components/Button';

const selectOptions = [
  'Нумерология',
  'Астрология',
  'Матрица',
  'Практики',
  'Книги',
];

const config = {
  alertSuccess:
    'Изменения успешно сохранены! Контент обновится в течение нескольких минут.',
  alertReset: 'Все последние изменения будут удалены!',
  submitConfirm: 'Все новые изменения будут применены к текущей статье!',
  submitError:
    'Ошибка обновления данных! Пожалуйста, срочно вышлите єтот текст разработчику:',
};

const EditArticle = ({ article }: { article: ArticleData }) => {
  const initState = {
    image: article.image ?? '',
    title: article.title,
    content: article.content,
    author: article.author,
    // tags: article.tags.join(', '), // Tags as a comma-separated string
    tags: article.tags as string[],
    views: article.views,
  };

  const [isPending, startTransition] = useTransition();
  const [isSelectError, setIsSelectError] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [form, setForm] = useState(initState);
  // const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  /*
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  */

  const handleFormContent = (text: string) => {
    setForm({ ...form, content: text });
  };

  const handleTagSelect = (selectedTag: string) => {
    if (isSelectError) handleSelectError(false);
    setForm((prevForm) => ({ ...prevForm, tags: [selectedTag] }));
    // tags: [...new Set([...prevForm.tags, selectedTag])], // * Multiple tags
  };

  const handleSelectError = (is: boolean) => {
    setIsSelectError(is);
  };

  const handleReset = () => {
    if (!confirm(config.alertReset)) return;
    setIsReset(true);
    setForm(initState);
    setTimeout(() => setIsReset(false), 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm(config.submitConfirm)) return;

    /*
    setError(null);
    const tags = form.tags.split(',').map((tag) => tag.trim());
    const payload = { ...form, tags };
    */

    try {
      if (isPending) return;
      startTransition(async () => {
        const res = await updateArticle(article._id, form);
        if (res && res._id === article._id) {
          alert(config.alertSuccess);
          router.push('/articles');
        }
      });
    } catch (err: unknown) {
      alert(`${config.submitError} ${(err as AxiosError).message}`);
      // setError((err as AxiosError).message);
    }
  };

  return (
    <Main className={'edit-article-page-main'}>
      <Section className={'main-hero-section'}>
        <Title tag="h2" className="page-main-title" text="Редактор статья" />
      </Section>

      <Section className="article-edit-form-section">
        <Form className="article-edit-form" handleSubmit={handleSubmit}>
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder={'Изображение (url)'}
            value={form.image}
            handleChange={(url) => setForm({ ...form, image: url })}
            isDisable={isPending}
          />
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder={'Название статьи'}
            value={form.title}
            handleChange={(text) => setForm({ ...form, title: text })}
            isDisable={isPending}
            // isRequire
          />
          <Select
            className="article-edit-form-select light-select-theme"
            options={selectOptions}
            initialOption={article.tags[0] ?? null}
            placeholder="Рубрика"
            onSelect={handleTagSelect}
            isError={isSelectError}
            isReset={isReset}
            isDisable={isPending}
          />
          <Textarea
            className="article-edit-form-textarea"
            placeholder="Текст статьи"
            value={form.content}
            handleChangeValue={handleFormContent}
            isDisable={isPending}
          />
          <div className="article-edit-form-button-block">
            <Button type="submit" isDisable={isPending}>
              Сохранить
            </Button>
            <Button
              type="button"
              clickContent={handleReset}
              isDisable={isPending}
            >
              Очистить
            </Button>
          </div>
        </Form>
      </Section>

      <Section className={'main-final-section-zero'}>{null}</Section>
    </Main>
  );
};

export default EditArticle;
