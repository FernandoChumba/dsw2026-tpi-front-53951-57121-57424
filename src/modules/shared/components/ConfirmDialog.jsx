import { useRef, useState } from 'react';
import Button from './Button';
import FormMessage from './FormMessage';
import Modal from './Modal';

function Confirmation({
  title,
  description,
  onConfirm,
  onClose,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
}) {
  const pending = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleConfirm() {
    if (pending.current) return;

    pending.current = true;
    setIsPending(true);
    setHasError(false);

    try {
      await onConfirm();
      onClose();
    } catch {
      setHasError(true);
    } finally {
      pending.current = false;
      setIsPending(false);
    }
  }

  function handleClose() {
    if (!pending.current) onClose();
  }

  return (
    <Modal isOpen title={title} onClose={handleClose} dismissible={!isPending}>
      <div className="flex flex-col gap-4">
        {description && (
          <p className="text-sm text-med-text-sub">{description}</p>
        )}
        {hasError && (
          <FormMessage type="error">
            No se pudo completar la acción. Volvé a intentar.
          </FormMessage>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" disabled={isPending} onClick={handleClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? 'Procesando…' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function ConfirmDialog({ isOpen, ...props }) {
  return isOpen ? <Confirmation {...props} /> : null;
}
