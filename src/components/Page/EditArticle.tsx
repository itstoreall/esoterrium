'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { updateArticle } from '@/src/services/articleService';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { CategoryEnum } from '@/src/enum';
import { ArticleData } from '@/src/types';
import * as gc from '@/src/config';
import SimpleInput from '@/src/components/Form/SimpleInput';
import SelectMulti from '@/src/components/Form/SelectMulti';
import Textarea from '@/src/components/Form/Textarea';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import Form from '@/src/components/Form/Form';
import Button from '@/src/components/Button';

// const selectOptions = [
//   'Нумерология',
//   'Астрология',
//   'Матрица',
//   'Практики',
//   'Книги',
// ];

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

  const [initialLvl2Option, setInitialLvl2Option] = useState('');
  const [isSelectError, setIsSelectError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isResetLvl2, setIsResetLvl2] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [form, setForm] = useState(initState);

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const router = useRouter();

  const isNumerology = form.tags[0] === CategoryEnum.Numerology;
  const isPractices = form.tags[0] === CategoryEnum.Practices;
  const isCources = form.tags[0] === CategoryEnum.Courses;
  const isBooks = form.tags[0] === CategoryEnum.Books;
  const isLvl2 = isNumerology || isPractices || isCources || isBooks;

  const selectOptionsLvl2 = isNumerology
    ? gc.selectOptionsNumerologyTopic
    : isPractices
    ? gc.selectOptionsPracticesTopic
    : isCources || isBooks
    ? gc.selectOptionsCourcesTopic
    : [];

  useEffect(() => {
    const init = article.tags;
    const current = form.tags;
    /*
    console.log('');
    console.log('init:', init);
    console.log('current:', current);
    console.log('===:', init, current, init === current);
    */

    if (init === current) {
      setInitialLvl2Option(article.tags[1]);
    } else {
      // if (init.length === current.length) { console.log(3) }
      if (init.length > current.length) {
        console.log(4);
        setInitialLvl2Option('');
        setIsResetLvl2(true);
        setTimeout(() => setIsResetLvl2(false), 1000);
      }
    }
  }, [form.tags]);

  /*
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  */

  const handleFormContent = (text: string) => {
    setForm({ ...form, content: text });
  };

  const handleTagLvl1Select = (selectedTag: string) => {
    if (isSelectError) handleSelectError(false);
    setForm((prevForm) => ({ ...prevForm, tags: [selectedTag] }));
    // tags: [...new Set([...prevForm.tags, selectedTag])], // * Multiple tags
  };

  const handleTagLvl2Select = (selectedTag: string) => {
    if (isSelectError) handleSelectError(false);
    setForm((prevForm) => ({
      ...prevForm,
      tags: [prevForm.tags[0], selectedTag],
    }));
  };

  const handleSelectError = (is: boolean) => {
    setIsSelectError(is);
  };

  const handleReset = () => {
    if (!confirm(config.alertReset)) return;
    setIsResetLvl2(true);
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
      <Section className={'main-heading-section first-element'}>
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

          <div className="article-create-form-select-block">
            <SelectMulti
              className="article-edit-form-select light-select-theme"
              options={gc.selectOptionsLvl1.filter(
                (opt) => opt !== form.tags[0]
              )}
              initialOption={article.tags[0] ?? null}
              placeholder="Рубрика"
              onSelect={handleTagLvl1Select}
              isError={isSelectError}
              isReset={isReset}
              isDisable={isPending}
              isOpen={openDropdownId === 'category'}
              onToggle={() => toggleDropdown('category')}
            />
            <SelectMulti
              className="article-edit-form-select light-select-theme"
              options={selectOptionsLvl2.filter((opt) => opt !== form.tags[1])}
              initialOption={initialLvl2Option}
              // initialOption={article.tags[1] ?? null}
              placeholder="Тема"
              onSelect={handleTagLvl2Select}
              isError={isSelectError}
              isReset={isResetLvl2}
              // isReset={isReset || form.tags.length === 1}
              isDisable={isPending || !isLvl2}
              isOpen={openDropdownId === 'topic'}
              onToggle={() => toggleDropdown('topic')}
            />
          </div>

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

      {/* <Section className={'main-final-section-zero'}>{null}</Section> */}
    </Main>
  );
};

export default EditArticle;
