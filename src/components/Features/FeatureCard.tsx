// src/components/Features/FeatureCard.tsx
import './Features.css';

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

const FeatureCard = ({ title, description, image }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <img src={image} alt={title} className="feature-image" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;