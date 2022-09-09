import { RefObject, useEffect } from 'react';
import Rellax from 'rellax';

export const useParallaxEffect = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: Object
) => {
  useEffect(() => {
    const rellax = new Rellax(ref.current as Element, options);

    return () => {
      rellax.destroy();
    };
  }, [ref]);
};
export default useParallaxEffect;
