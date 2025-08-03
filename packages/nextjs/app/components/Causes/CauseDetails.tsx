import { StaticImageData } from "next/image";
import Image from "next/image";
import "./CauseDetails.css";

// Añade esta importación

type CauseDetailsProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  donationType: "monetary" | "in-kind";
  itemsNeeded?: string[];
  impactMetrics?: string[];
  onClose: () => void;
  onDonate: () => void; // Nueva prop
};

const CauseDetails = ({
  image,
  title,
  description,
  raised,
  goal,
  donationType,
  itemsNeeded = [],
  impactMetrics = [],
  onClose,
  onDonate, // Nueva prop
}: CauseDetailsProps) => {
  const progress = donationType === "monetary" ? Math.min((raised / goal) * 100, 100) : 0;

  const handleDonateClick = () => {
    onClose(); // Primero cerramos el modal de detalles
    onDonate(); // Luego abrimos el modal de donación
  };

  return (
    <div className="cause-details-overlay">
      <div className="cause-details-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="details-content">
          <div className="details-image-container">
            <Image
              src={image}
              alt={title}
              className="details-image"
              placeholder="blur" // Opcional para efecto de carga progresiva
            />
          </div>

          <div className="details-text">
            <h2>{title}</h2>

            {donationType === "in-kind" ? (
              <div className="donation-type-section in-kind">
                <h3>Donaciones en Especie</h3>
                <p>Esta causa acepta donaciones no monetarias</p>

                {itemsNeeded.length > 0 && (
                  <div className="items-needed-list">
                    <h4>Artículos Necesarios:</h4>
                    <ul>
                      {itemsNeeded.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="cause-stats">
                  <span>${raised.toLocaleString()} recaudados</span>
                  <span>Meta: ${goal.toLocaleString()}</span>
                </div>
              </>
            )}

            <div className="description-container">
              <h3>Detalles de la Causa</h3>
              <p className="full-description">{description}</p>
            </div>

            {impactMetrics.length > 0 && (
              <div className="impact-metrics">
                <h3>Impacto Esperado</h3>
                <ul>
                  {impactMetrics.map((metric, index) => (
                    <li key={index}>{metric}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              {donationType === "monetary" ? (
                <button
                  className="donate-button"
                  onClick={handleDonateClick} // Agregamos el onClick
                >
                  Donar Ahora
                </button>
              ) : (
                <button className="donate-button">Ver Puntos de Acopio</button>
              )}
              <button className="back-button" onClick={onClose}>
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseDetails;
