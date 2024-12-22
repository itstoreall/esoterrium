import { useState } from 'react';

type CopyState = { [key: string]: boolean };

const useCopyState = () => {
  const [copyState, setCopyState] = useState<CopyState>({});

  const copyValue = (key: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopyState((prev) => ({
        ...prev,
        [key]: true,
      }));

      setTimeout(() => {
        setCopyState((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 300);
    });
  };

  const isCopied = (key: string) => !!copyState[key];
  
  return { copyValue, isCopied };
};

export default useCopyState;
