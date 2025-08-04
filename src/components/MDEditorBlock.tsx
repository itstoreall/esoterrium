// import MDEditor from '@uiw/react-md-editor';
import Markdown from 'react-markdown';

type Props = {
  className: 'article-details-mdeditor-block';
  text: string;
};

const MDEditorBlock = ({ className, text }: Props) => {
  return (
    <div className={`mdeditor-block ${className}`}>
      {/* <MDEditor.Markdown
        style={{ whiteSpace: 'pre-wrap' }}
        className="mdeditor-markdown-top-lib-elenemt"
        source={text}
      /> */}
      <Markdown
      // style={{ whiteSpace: 'pre-wrap' }}
      // className="mdeditor-markdown-top-lib-elenemt"
      >
        {text}
      </Markdown>
    </div>
  );
};

export default MDEditorBlock;
