import { TextareaEvent } from '@/src/types';
import { useEffect, useRef, useState } from 'react';

const lsKey = 'notes_text';

const useNotes = () => {
  const getLSNotes = () => localStorage.getItem(lsKey) || '';

  const [notesText, setNotesText] = useState(getLSNotes() || '');

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
      console.log(val);
      localStorage.setItem(lsKey, val);
    }, 2000);
  };

  const handleNotesChange = (e: TextareaEvent) => {
    const textarea = e.target;
    const maxHeight = 406;
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
