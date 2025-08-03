import MDEditor from '@uiw/react-md-editor';

type Props = {
  className: 'article-details-mdeditor-block';
  text: string;
};

const MDEditorBlock = ({ className, text }: Props) => {
  // console.log('text:', text);

  return (
    <div className={`mdeditor-block ${className}`}>
      {text && (
        <MDEditor.Markdown
          style={{ whiteSpace: 'pre-wrap' }}
          className="mdeditor-markdown-top-lib-elenemt"
          source={'text 111'}
          // source={text}
        />
      )}
    </div>
  );
};

export default MDEditorBlock;
