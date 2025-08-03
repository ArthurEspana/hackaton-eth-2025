"use client";

// src/pages/Causes/CauseCard.tsx
import { useState } from "react";
import Image from "next/image";
import DonationModal from "../../../components/DonationModal/DonationModal";
import type { Cause } from "../../principal/types/cause";
import "./CauseCard.css";
import "./CauseCard.css";
import CauseDetails from "./CauseDetails";

interface CauseCardProps extends Cause {
  onDonate: (id: number, amount: number) => void;
  // Elimina la redefinición de image aquí
}

const CauseCard = ({
  id,
  image,
  title,
  description,
  fullDescription,
  raised,
  goal,
  donationType,
  walletAddress,
  itemsNeeded,
  impactMetrics,
  onDonate,
}: CauseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const progress = donationType === "monetary" ? Math.min((raised / goal) * 100, 100) : 0;

  const handleDonateClick = () => {
    if (donationType === "monetary") {
      setShowDonationModal(true);
    } else {
      handleInKindDonation();
    }
  };

  const handleInKindDonation = () => {
    const donationAmount = 1; // Representa 1 ítem
    onDonate(id, donationAmount);
    alert(`¡Gracias por tu contribución en especie a "${title}"!`);
  };

  const handleConfirmDonation = (amount: number) => {
    onDonate(id, amount);
    setShowDonationModal(false); // Cerrar modal después de donar
    alert(`¡Donación de ${amount} tokens confirmada para "${title}"!`);
  };

  const handleOpenDonationModal = () => {
    setShowDonationModal(true);
  };

  return (
    <>
      <div className="cause-card">
        <div className="image-container">
          <Image
            src={image}
            alt={title}
            className="cause-image"
            placeholder="blur" // Opcional para efecto de carga progresiva
          />
        </div>

        <div className="card-content">
          <h3 className="cause-title">{title}</h3>
          <p className="cause-description">{description}</p>

          <div className={`donation-type-banner ${donationType}`}>
            <span>{donationType === "monetary" ? "Donaciones monetarias" : "Donaciones en especie"}</span>
          </div>

          {donationType === "monetary" && (
            <>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="cause-stats">
                <span className="raised-amount">${raised.toLocaleString()}</span>
                <span>de ${goal.toLocaleString()}</span>
              </div>
            </>
          )}

          <div className="card-actions">
            <button onClick={() => setShowDetails(true)} className="details-button">
              Ver detalles
            </button>
            <button onClick={handleDonateClick} className="donate-button">
              {donationType === "monetary" ? "Donar ahora" : "Contribuir"}
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <CauseDetails
          image={image}
          title={title}
          description={fullDescription || description}
          raised={raised}
          goal={goal}
          donationType={donationType}
          itemsNeeded={itemsNeeded}
          impactMetrics={impactMetrics}
          onClose={() => setShowDetails(false)}
          onDonate={handleOpenDonationModal} // Pasamos la nueva prop
        />
      )}

      {showDonationModal && (
        <DonationModal
          causeId={id}
          causeTitle={title}
          walletAddress={walletAddress}
          onClose={() => setShowDonationModal(false)}
          onConfirm={handleConfirmDonation}
        />
      )}
    </>
  );
};

export default CauseCard;

/*
    const handleDonate = () => {
        const donationAmount = 50;

        // Simulación de transacción con wallet
        console.log(`Simulando envío de ${donationAmount} tokens a la dirección: ${walletAddress}`);
        
        // Llamar a la función original de donación
        onDonate(id, donationAmount);
        
        // Aquí iría la lógica real de MetaMask en un proyecto real
        alert(`Donación simulada: ${donationAmount} tokens enviados a la causa "${title}"`);

        onDonate(id, donationAmount);

        
    };
    */
