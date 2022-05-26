import { ReactNode, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './modal-container.module.css';

interface ModalContainerProps {
  children: ReactNode;
  onOverlayClick: () => void;
}

function ModalContainer({ children, onOverlayClick }: ModalContainerProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleModalCloseKeydowm = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        onOverlayClick();
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleModalCloseKeydowm);

    return () => {
      document.removeEventListener('keydown', handleModalCloseKeydowm);
    };
  }, [dispatch, onOverlayClick]);

  const handleModalCloseClick = () => {
    onOverlayClick();
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`${styles['modal']}`}>
      <div className={styles['wrapper']}>
        <div className={styles['overlay']} onClick={handleModalCloseClick} />
        <FocusLock>{children}</FocusLock>
      </div>
    </div>
  );
}

export default ModalContainer;
