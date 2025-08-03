"use client";

import { StaticImageData } from "next/image";
import escolarImg from "../../assets/escolar.png";
import incendioImg from "../../assets/incendio.png";
import juvenilImg from "../../assets/juvenil.png";
import olla_comunImg from "../../assets/olla_comun.png";
import reforestacionImg from "../../assets/reforestacion.png";
import santuarioImg from "../../assets/santuario.png";
import Causes from "../../components/Causes/Causes";
import { useCauses } from "../hooks/useCauses";

const imageMap: Record<string, StaticImageData> = {
  "escolar.png": escolarImg,
  "incendio.png": incendioImg,
  "juvenil.png": juvenilImg,
  "olla_comun.png": olla_comunImg,
  "reforestacion.png": reforestacionImg,
  "santuario.png": santuarioImg,
};

export default function CausesPage() {
  const { causes, isLoading, updateCause } = useCauses();

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
          const imageName = typeof cause.image === "string" ? cause.image : "santuario.png";
          const imageSrc = imageMap[imageName] || santuarioImg;

          return (
            <CauseCard
              key={cause.id}
              id={cause.id}
              image={imageSrc}
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
}
