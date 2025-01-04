import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { getLatestArticleIdx } from '@/src/lib/mongoose/getLatestArticleIdxServerAction';
import { createArticle } from '@/src/services/articleService';
import { CategoryEnum } from '@/src/enum';
import * as gc from '@/src/config';
import SimpleInput from '@/src/components/Form/SimpleInput';
import SelectMulti from '@/src/components/Form/SelectMulti';
import Textarea from '@/src/components/Form/Textarea';
import Title from '@/src/components/Layout/Title';
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

const CreateArticle = () => {
  const [isPending, startTransition] = useTransition();
  const [isSelectError, setIsSelectError] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [form, setForm] = useState(initState);

  // ---
  // const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // const toggleDropdown = (id: string) => {
  //   setOpenDropdownId((prev) => (prev === id ? null : id));
  // };
  // ---

  // console.log('form:', form);

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const session = useSession();
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

  // useEffect(() => {
  //   console.log(111, form.tags);
  //   // setForm((prevForm) => ({ ...prevForm, tags: [prevForm.tags[0]] }));
  // }, [form.tags]);

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
      const author = session.data.user.name;
      const firstView = session.data.user.id;
      const latestArticle = await getLatestArticleIdx();
      const idx = latestArticle ? latestArticle.idx + 1 : 1;
      if (isPending) return;
      startTransition(async () => {
        const res = await createArticle({
          ...form,
          idx,
          author,
          views: [firstView],
        });
        if (res) {
          alert('Статья успешно создана! Теперь ее можно опубликовать.');
          router.push('/articles');
        }
      });
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

  const handleReset = () => {
    if (!confirm('Вся введенная информация будет удалена!')) return;
    setIsReset(true);
    setForm(initState);
    setTimeout(() => setIsReset(false), 1000);
  };

  // ---

  // console.log('isLvl2:', isLvl2);

  return (
    <Main className={'create-article-page-main'}>
      <Section className={'main-heading-section first-element'}>
        <Title tag="h2" className="page-main-title" text="Новая статья" />
      </Section>

      <Section className="article-create-form-section">
        <Form className="article-create-form" handleSubmit={handleSubmit}>
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder="Изображение (url)"
            value={form.image}
            handleChange={(url) => setForm({ ...form, image: url })}
            isDisable={isPending}
          />
          <SimpleInput
            className="light-input-theme"
            type="text"
            placeholder="Название статьи"
            value={form.title}
            handleChange={(text) => setForm({ ...form, title: text })}
            isDisable={isPending}
            isRequire
          />

          <div className="article-create-form-select-block">
            <SelectMulti
              className="article-create-form-select light-select-theme"
              options={gc.selectOptionsLvl1.filter(
                (opt) => opt !== form.tags[0]
              )}
              initialOption={null}
              placeholder="Рубрика"
              onSelect={handleTagLvl1Select}
              isError={isSelectError}
              isReset={isReset}
              isDisable={isPending}
              isOpen={openDropdownId === 'category'}
              onToggle={() => toggleDropdown('category')}
            />
            <SelectMulti
              className={'article-create-form-select light-select-theme'}
              options={selectOptionsLvl2.filter((opt) => opt !== form.tags[1])}
              initialOption={null}
              placeholder="Тема"
              onSelect={handleTagLvl2Select}
              isError={isSelectError}
              isReset={isReset || form.tags.length === 1}
              isDisable={isPending || !isLvl2}
              isOpen={openDropdownId === 'topic'}
              onToggle={() => toggleDropdown('topic')}
            />
          </div>

          {/* <div className="article-create-form-select-block">
            <Select
              className="article-create-form-select light-select-theme"
              options={selectOptionsLvl1}
              initialOption={null}
              placeholder="Рубрика"
              onSelect={handleTagLvl1Select}
              isError={isSelectError}
              isReset={isReset}
              isDisable={isPending}
            />
            <Select
              className={'article-create-form-select light-select-theme'}
              options={selectOptionsLvl2}
              initialOption={null}
              placeholder="Тема"
              onSelect={handleTagLvl2Select}
              isError={isSelectError}
              isReset={isReset}
              isDisable={isPending || !isLvl2}
            />
          </div> */}

          <Textarea
            className="article-create-form-textarea"
            placeholder="Текст статьи"
            value={form.content}
            handleChangeValue={handleFormContent}
            isDisable={isPending}
          />
          <div className="article-create-form-button-block">
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

export default CreateArticle;

/* 
--- Update Articles:
import { useQueryClient } from '@tanstack/react-query';
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['articles'] });
*/
