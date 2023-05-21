import { MutableRefObject, useEffect } from 'react';

export default function useClickOutside(ref: MutableRefObject<HTMLElement | null>, callback: () => void) {
  const handleClickOutside = (evt: MouseEvent) => {
    if (ref.current && !ref.current.contains(evt.target as Node | null)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [ref])
}
