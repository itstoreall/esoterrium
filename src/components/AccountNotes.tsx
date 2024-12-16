import { FiTrash2 } from 'react-icons/fi';
import Button from './Button';
import useNotes from '../hooks/useNotes';
import { useEffect, useState } from 'react';

const accountMobileWidth = 615;

const AccountNotes = () => {
  const [isWideViewport, setIsWideViewport] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { notesText, handleNotesChange, clearNotes } = useNotes();

  useEffect(() => {
    const checkViewportWidth = () => {
      setIsWideViewport(window.innerWidth > accountMobileWidth);
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);

    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    // <div className="user-account-notes-container">
    isWideViewport ? (
      <div className="user-account-notes-block">
        <textarea
          placeholder="Напишите заметку"
          className="user-account-notes-textarea"
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
    ) : (
      <>
        {isExpanded && (
          <div className="user-account-notes-block">
            <textarea
              placeholder="Напишите заметку"
              className="user-account-notes-textarea"
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
        )}
        <Button className="dashboard-text-button" clickContent={toggleExpand}>
          {isExpanded ? 'Скрыть заметки' : 'Показать заметки'}
        </Button>
      </>
    )
  );

  // return isExpanded ? (
  //   <div className="user-account-notes-block">
  //     {/* <div>
  //       <MDEditor.Markdown source={'Hello!'} />
  //     </div> */}

  //     <textarea
  //       // ref={taRef}
  //       placeholder="Напишите заметку"
  //       className={'user-account-notes-textarea'}
  //       value={notesText}
  //       onChange={(e) => handleNotesChange(e)}
  //       // onChange={(e) => handleNotesChange(e.target.value)}
  //       rows={10}
  //     />

  //     <FiTrash2
  //       className="user-account-notes-trash-button"
  //       size={25}
  //       onClick={() => clearNotes()}
  //     />
  //   </div>
  // ) : (
  //   <Button className="dashboard-text-button" clickContent={toggleExpand}>
  //     {isExpanded ? 'Скрыть заметки' : 'Показать заметки'}
  //   </Button>
  // );
};

export default AccountNotes;
