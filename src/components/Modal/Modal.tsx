import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { NoteCreate } from '../../types/note';
import NoteForm from '../NoteForm/NoteForm';
import './Modal.module.css';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  onSubmit: (values: NoteCreate) => void;
}

const Modal = ({ onClose, onSubmit }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm onCancel={onClose} onSubmit={onSubmit} />
      </div>
    </div>,
    document.body,
  );
};

export default Modal;