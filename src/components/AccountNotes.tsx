// import useNotes from '@/src/hooks/useNotes';
import { FiTrash2 } from 'react-icons/fi';
import { TextareaEvent } from '../types';
// import Button from '@/src/components/Button';

type Props = {
  notesText: string;
  handleNotesChange: (val: TextareaEvent) => void;
  clearNotes: () => void;
};

const AccountNotes = ({ notesText, handleNotesChange, clearNotes }: Props) => {
  // const { notesText, handleNotesChange, clearNotes } = useNotes();

  return (
    <div className="user-account-notes-block">
      {/* <div>
        <MDEditor.Markdown source={'Hello!'} />
      </div> */}

      <textarea
        placeholder="Напишите заметку"
        className={'user-account-notes-textarea'}
        value={notesText}
        onChange={(e) => handleNotesChange(e)}
        rows={10}
      />

      <FiTrash2
        className="user-account-notes-trash-button"
        size={25}
        onClick={() => clearNotes()}
      />
    </div>
  );
};

export default AccountNotes;
