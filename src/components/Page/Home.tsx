import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Link href="/dashboard">
        <button
          style={{
            color: 'white',
            marginBottom: '30px',
          }}
        >
          Вход
        </button>
      </Link>

      <main>
        <div
          style={{
            backgroundColor: 'palevioletred',
            marginBottom: '30px',
          }}
        >
          <span style={{ lineHeight: 2 }}>ОБЩЕДОСТУПНЬІЙ контент</span>
          <p style={{ lineHeight: 1.3 }} className="content-text">
            Текст — це витвір мовленнєвого процесу, що відзначається
            завершеністю, обєктивований у вигляді письмового документа,
            літературно опрацьований відповідно до типу документа, витвір, який
            складається із заголовка і ряду особливих одиниць (надфразових
            єдностей), обєднаних різними типами лексичного, граматичного,
            логічного, стилістичного звязку, і має певну цілеспрямованість і
            прагматичну визначеність
          </p>
        </div>

        <Link href="/dashboard">
          <div
            style={{
              backgroundColor: 'teal',
              marginBottom: '30px',
            }}
          >
            <span style={{ lineHeight: 2 }}>PREMIUM content</span>
            <p style={{ lineHeight: 1.3 }} className="content-text">
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
          </div>
        </Link>
        <div
          style={{
            backgroundColor: 'palevioletred',
            marginBottom: '30px',
          }}
        >
          <span style={{ lineHeight: 2 }}>ОБЩЕДОСТУПНЬІЙ контент</span>
          <p style={{ lineHeight: 1.3 }} className="content-text">
            Текст — це витвір мовленнєвого процесу, що відзначається
            завершеністю, обєктивований у вигляді письмового документа,
            літературно опрацьований відповідно до типу документа, витвір, який
            складається із заголовка і ряду особливих одиниць (надфразових
            єдностей), обєднаних різними типами лексичного, граматичного,
            логічного, стилістичного звязку, і має певну цілеспрямованість і
            прагматичну визначеність
          </p>
        </div>

        <Link href="/dashboard">
          <div
            style={{
              backgroundColor: 'teal',
              marginBottom: '30px',
            }}
          >
            <span style={{ lineHeight: 2 }}>PREMIUM content</span>
            <p style={{ lineHeight: 1.3 }} className="content-text">
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
          </div>
        </Link>
        <div
          style={{
            backgroundColor: 'palevioletred',
            marginBottom: '30px',
          }}
        >
          <span style={{ lineHeight: 2 }}>ОБЩЕДОСТУПНЬІЙ контент</span>
          <p style={{ lineHeight: 1.3 }} className="content-text">
            Текст — це витвір мовленнєвого процесу, що відзначається
            завершеністю, обєктивований у вигляді письмового документа,
            літературно опрацьований відповідно до типу документа, витвір, який
            складається із заголовка і ряду особливих одиниць (надфразових
            єдностей), обєднаних різними типами лексичного, граматичного,
            логічного, стилістичного звязку, і має певну цілеспрямованість і
            прагматичну визначеність
          </p>
        </div>

        <Link href="/dashboard">
          <div
            style={{
              backgroundColor: 'teal',
              marginBottom: '30px',
            }}
          >
            <span style={{ lineHeight: 2 }}>PREMIUM content</span>
            <p style={{ lineHeight: 1.3 }} className="content-text">
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
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
