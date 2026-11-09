import { useEffect, useId, useRef } from 'react';
import Button from './Button';

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  dismissible = true,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const opener = document.activeElement;

    dialog.showModal();

    return () => {
      dialog.close();

      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus();
      }
    };
  }, [isOpen]);

  function handleCancel(event) {
    event.preventDefault();

    if (dismissible) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl border border-med-border bg-med-card p-4 text-med-text-main shadow-xl backdrop:bg-med-text-main/50 sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 id={titleId} className="text-lg font-semibold text-med-primary-900">
          {title}
        </h2>
        <Button variant="ghost" disabled={!dismissible} onClick={onClose}>
          Cerrar
        </Button>
      </div>
      {children}
    </dialog>
  );
}
