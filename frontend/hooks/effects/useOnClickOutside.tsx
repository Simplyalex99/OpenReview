import { useEffect, RefObject } from 'react';

type AnyEvent = MouseEvent | TouchEvent;
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (e: AnyEvent) => {
      const element = ref?.current;
      if (!element || element.contains(e.target as Node)) {
        return;
      }

      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);
};
export default useOnClickOutside;
