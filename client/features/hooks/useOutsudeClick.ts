import { RefObject, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {
  const handleClick = ({ target }: any) => {
    if (ref?.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
