// src/pages/Causes/CauseCard.tsx
import './CauseCard.css';
import type { Cause } from '../../types/cause';
import { useState } from 'react';
import CauseDetails from './CauseDetails';

interface CauseCardProps extends Cause {
    onDonate: (id: number, amount: number) => void;
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
    itemsNeeded,
    impactMetrics,
    onDonate,
}: CauseCardProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const progress = donationType === 'monetary' ? Math.min((raised / goal) * 100, 100) : 0;
    
    const handleDonate = () => {
        const donationAmount = 50;
        onDonate(id, donationAmount);
    };

    return (
        <>
            <div className="cause-card">
                <div className="image-container">
                    <img src={image} alt={title} className="cause-image" />
                </div>
                
                <div className="card-content">
                    <h3 className="cause-title">{title}</h3>
                    <p className="cause-description">{description}</p>
                    
                    <div className={`donation-type-banner ${donationType}`}>
                        <span>
                            {donationType === 'monetary' ? 'Donaciones monetarias' : 'Donaciones en especie'}
                        </span>
                    </div>
                    
                    {donationType === 'monetary' && (
                        <>
                            <div className="progress-container">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="cause-stats">
                                <span className="raised-amount">${raised.toLocaleString()}</span>
                                <span>de ${goal.toLocaleString()}</span>
                            </div>
                        </>
                    )}
                    
                    <div className="card-actions">
                        <button 
                            onClick={() => setShowDetails(true)}
                            className="details-button"
                        >
                            Ver detalles
                        </button>
                        <button 
                            onClick={handleDonate}
                            className="donate-button"
                        >
                            {donationType === 'monetary' ? 'Donar ahora' : 'Contribuir'}
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
                />
            )}
        </>
    );
};

export default CauseCard;