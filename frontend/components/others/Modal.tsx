import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOnClickOutside } from '../../hooks';
import modalStyles from '../../styles/components/Modal.module.scss';
import { CloseSVG } from '../svg/common/Close';
import { Card } from '../cards/Card';

interface ModalProps {
  open: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
  className?: string;
  secondClassName?: string;
}
export const Modal = ({
  open,
  closeHandler,
  children,
  className,
  secondClassName,
}: ModalProps) => {
  if (typeof window === 'undefined' || !open) {
    return null;
  }
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, closeHandler);
  // eslint-disable-next-line consistent-return
  return (
    <>
      {ReactDOM.createPortal(
        <div className={modalStyles.container}>
          <div ref={ref} className={`${modalStyles.wrapper} ${className}`}>
            <Card
              className={`${modalStyles['card-container']} ${secondClassName}`}
            >
              <div className={modalStyles.close}>
                <CloseSVG onClick={closeHandler} />
              </div>
              <div>{children}</div>
            </Card>{' '}
          </div>
        </div>,
        document.getElementById('modal') as Element
      )}
    </>
  );
};
export default Modal;
