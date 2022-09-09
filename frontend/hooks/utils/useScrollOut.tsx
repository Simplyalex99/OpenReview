import { useEffect } from 'react';
import ScrollOut from 'scroll-out';

interface ScrollOutProps {
  options?: Object;
}
export const useScrollOut = ({ options }: ScrollOutProps) => {
  useEffect(() => {
    const scroll = ScrollOut(options);

    return () => {
      scroll.teardown();
    };
  }, []);
};

export default useScrollOut;
