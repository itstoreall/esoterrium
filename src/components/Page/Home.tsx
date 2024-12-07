'use client';

import Link from 'next/link';
import Section from '@/src/components/Section';
import Main from '@/src/components/Layout/Main';
import Title from '../Layout/Title';

const arts = [
  'article1',
  'article2',
  'article3',
  // 'article4',
  // 'article5',
];

const Home = () => {
  return (
    <Main className={'home-page-main'}>
      {arts.map((art) => (
        <div
          key={art}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <Section className={'readable-content-section'}>
            <Title
              tag="h2"
              className="readable-content"
              text={'Витвір мовленнєвого процесу'}
            />
            <p className="readable-content">
              Текст — це витвір мовленнєвого процесу, що відзначається
              завершеністю, обєктивований у вигляді письмового документа,
              літературно опрацьований відповідно до типу документа, витвір,
              який складається із заголовка і ряду особливих одиниць
              (надфразових єдностей), обєднаних різними типами лексичного,
              граматичного, логічного, стилістичного звязку, і має певну
              цілеспрямованість і прагматичну визначеність
            </p>
          </Section>

          <Link href="/dashboard">
            <Section className={'readable-content-section'}>
              <Title
                tag="h2"
                className="readable-content"
                text={'Product of the speech process'}
              />
              <p className="readable-content">
                A text is a product of the speech process, characterized by a
                product of the speech process, which is characterized by
                completeness, objectified in the form of a written document,
                literary processed in accordance with the type of document, a
                work, consisting of a title and a number of special units
                (superphrase unities), united by different types of lexical
                grammatical, logical, stylistic connection, and has a certain
                purposefulness and pragmatic certainty Translated with DeepL.com
                (free version)
              </p>
            </Section>
          </Link>
        </div>
      ))}
    </Main>
  );
};

export default Home;
