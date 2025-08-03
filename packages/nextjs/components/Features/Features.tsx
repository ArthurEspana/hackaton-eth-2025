// src/components/Features/Features.tsx
import descentralizacionImg from "../../assets/descentralizacion.png";
import gobernanzaImg from "../../assets/gobernanza.png";
import transparenciaImg from "../../assets/transparencia.png";
import FeatureCard from "./FeatureCard";
import "./Features.css";

const Features = () => {
  const features = [
    {
      title: "DESCENTRALIZACIÓN",
      description: "Ofrecemos donaciones directas de usuario a causa, sin intermediarios ni censura.",
      image: descentralizacionImg,
    },
    {
      title: "GOBERNANZA",
      description: "Validamos las causas, asegurando la legitimidad y la confianza en cada donación",
      image: gobernanzaImg,
    },
    {
      title: "TRANSPARENCIA",
      description: "Cada donación es pública, inmutable y verificable en la blockchain",
      image: transparenciaImg,
    },
  ];

  return (
    <section className="features-section">
      <h2>Nuestros Beneficios</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} image={feature.image} />
        ))}
      </div>
    </section>
  );
};

export default Features;
