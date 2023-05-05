import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../hooks';

interface ModalProps {
  open: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
  className?: string;
}
export const Modal = ({
  open,
  closeHandler,
  children,
  className,
}: ModalProps) => {
  if (typeof window === 'undefined' || !open) {
    return;
  }
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, closeHandler);
  // eslint-disable-next-line consistent-return
  return createPortal(
    <div>
      <div ref={ref} className={className}>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('modals') as Element
  );
};
export default Modal;
