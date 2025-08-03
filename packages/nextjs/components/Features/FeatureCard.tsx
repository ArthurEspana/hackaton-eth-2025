// src/components/Features/FeatureCard.tsx
import "./Features.css";

import Image from "next/image";

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

const FeatureCard = ({ title, description, image }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Image src={image} alt={title} width={48} height={48} className="feature-image" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
