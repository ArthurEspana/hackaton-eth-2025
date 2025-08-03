"use client";

// src/pages/Causes/Causes.tsx
import { StaticImageData } from "next/image";
import Link from "next/link";
// Importar todas las imágenes
import escolarImg from "../../principal/assets/escolar.png";
import incendioImg from "../../principal/assets/incendio.png";
import juvenilImg from "../../principal/assets/juvenil.png";
import olla_comunImg from "../../principal/assets/olla_comun.png";
import reforestacionImg from "../../principal/assets/reforestacion.png";
import santuarioImg from "../../principal/assets/santuario.png";
import { useCauses } from "../../principal/hooks/useCauses";
import CauseCard from "./CauseCard";
import "./Causes.css";

// Mapeo de nombres de archivo a las imágenes importadas
const imageMap: Record<string, StaticImageData> = {
  "escolar.png": escolarImg,
  "incendio.png": incendioImg,
  "juvenil.png": juvenilImg,
  "olla_comun.png": olla_comunImg,
  "reforestacion.png": reforestacionImg,
  "santuario.png": santuarioImg,
};

const Causes = () => {
  const { causes, isLoading, updateCause } = useCauses();

  // Función para manejar donaciones
  const handleDonation = (causeId: number, amount: number) => {
    const causeToUpdate = causes.find(c => c.id === causeId);
    if (causeToUpdate) {
      const updatedCause = {
        ...causeToUpdate,
        raised: causeToUpdate.raised + amount,
      };
      updateCause(updatedCause);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando causas...</div>;
  }

  return (
    <div className="causes-page">
      <div className="causes-header">
        <h1>Causas Sociales y Ambientales</h1>
        <p className="page-description">Conecta con iniciativas que transforman realidades en Bolivia</p>
        <Link href="/" className="back-button">
          Volver al Inicio
        </Link>
      </div>

      <div className="causes-grid">
        {causes.map(cause => {
          // Obtener la imagen correcta del mapa
          const imageName = typeof cause.image === "string" ? cause.image : "santuario.png";
          const imageSrc = imageMap[imageName] || santuarioImg;

          return (
            <CauseCard
              key={cause.id}
              id={cause.id}
              image={imageSrc} // Pasar la imagen importada
              title={cause.title}
              description={cause.description}
              fullDescription={cause.fullDescription}
              raised={cause.raised}
              goal={cause.goal}
              donationType={cause.donationType}
              walletAddress={cause.walletAddress}
              onDonate={handleDonation}
              itemsNeeded={"itemsNeeded" in cause ? cause.itemsNeeded : undefined}
              impactMetrics={"impactMetrics" in cause ? cause.impactMetrics : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Causes;
