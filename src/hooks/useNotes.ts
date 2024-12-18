import { useEffect, useRef, useState } from 'react';
import { TextareaEvent } from '@/src/types';

const lsKey = 'notes_text';

const useNotes = () => {
  const [notesText, setNotesText] = useState('');

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lsNotes = localStorage.getItem(lsKey) || '';
    setNotesText(lsNotes);
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const updateNotes = (val: string) => {
    setNotesText(val);
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(lsKey, val);
    }, 2000);
  };

  const handleNotesChange = (e: TextareaEvent) => {
    const textarea = e.target;
    const maxHeight = 408;
    if (textarea.scrollHeight > maxHeight) return;
    updateNotes(textarea.value);
  };

  const clearNotes = () => {
    if (!confirm('Все заметки будут удалены!')) return;
    localStorage.removeItem(lsKey);
    setNotesText('');
  };

  return { notesText, handleNotesChange, clearNotes };
};

export default useNotes;
