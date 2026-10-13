import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetSmsState, selectIsLoading } from '@/store/slices/auth';
import { SmsAuthForm } from '@/components/auth/SmsAuthForm';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetSmsState());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} disabled={isLoading} aria-label="Закрыть">
          ✕
        </button>
        <SmsAuthForm onSuccess={onSuccess} />
      </div>
    </div>
  );
};
