import MDEditor from '@uiw/react-md-editor';

type Props = {
  className: 'article-details-mdeditor-block';
  text: string;
};

const MDEditorBlock = ({ className, text }: Props) => {
  return (
    <div className={`mdeditor-block ${className}`}>
      <MDEditor.Markdown
        style={{ whiteSpace: 'pre-wrap' }}
        className="mdeditor-markdown-top-lib-elenemt"
        source={text}
      />
    </div>
  );
};

export default MDEditorBlock;
