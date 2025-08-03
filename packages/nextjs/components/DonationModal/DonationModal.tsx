// src/components/DonationModal/DonationModal.tsx
import { useEffect } from "react";
import "./DonationModal.css";

type DonationModalProps = {
  causeId: number;
  causeTitle: string;
  walletAddress: string;
  onClose: () => void;
  onConfirm: (amount: number) => void;
};

const DonationModal = ({ causeId, causeTitle, walletAddress, onClose, onConfirm }: DonationModalProps) => {
  useEffect(() => {
    // Simular carga de datos
    console.log(`Preparando donación para causa ${causeId}`);
  }, [causeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = Number(formData.get("amount"));

    if (amount > 0) {
      onConfirm(amount);
      onClose();
    }
  };

  return (
    <div className="donation-modal-overlay">
      <div className="donation-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Donar a: {causeTitle}</h2>

        <div className="wallet-info">
          <p>Dirección de destino:</p>
          <code>{walletAddress}</code>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Cantidad de tokens a donar:</label>
            <input type="number" id="amount" name="amount" min="1" step="1" defaultValue="50" required />
          </div>

          <div className="suggested-amounts">
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("amount") as HTMLInputElement;
                input.value = "50";
              }}
            >
              50 tokens
            </button>

            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("amount") as HTMLInputElement;
                input.value = "100";
              }}
            >
              100 tokens
            </button>

            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("amount") as HTMLInputElement;
                input.value = "500";
              }}
            >
              500 tokens
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="confirm-button">
              Confirmar Donación
            </button>
          </div>
        </form>

        <div className="simulation-notice">
          <p>⚠️ Esta es una simulación. En una implementación real se conectaría con MetaMask.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
