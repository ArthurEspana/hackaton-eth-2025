// src/pages/Causes/Causes.tsx
import './Causes.css';
import CauseCard from './CauseCard';
import { Link } from 'react-router-dom';
import { useCauses } from '../../hooks/useCauses';
// Importar todas las imágenes
import escolarImg from '../../assets/escolar.png';
import incendioImg from '../../assets/incendio.png';
import juvenilImg from '../../assets/juvenil.png';
import olla_comunImg from '../../assets/olla_comun.png';
import reforestacionImg from '../../assets/reforestacion.png';
import santuarioImg from '../../assets/santuario.png';

// Mapeo de nombres de archivo a las imágenes importadas
const imageMap: Record<string, string> = {
  'escolar.png': escolarImg,
  'incendio.png': incendioImg,
  'juvenil.png': juvenilImg,
  'olla_comun.png': olla_comunImg,
  'reforestacion.png': reforestacionImg,
  'santuario.png': santuarioImg
};

const Causes = () => {
    const { causes, isLoading, updateCause } = useCauses();

    // Función para manejar donaciones
    const handleDonation = (causeId: number, amount: number) => {
        const causeToUpdate = causes.find(c => c.id === causeId);
        if (causeToUpdate) {
            const updatedCause = {
                ...causeToUpdate,
                raised: causeToUpdate.raised + amount
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
                <Link to="/" className="back-button">Volver al Inicio</Link>
            </div>

            <div className="causes-grid">
                {causes.map(cause => {
                    // Obtener la imagen correcta del mapa
                    const imageSrc = imageMap[cause.image] || santuarioImg;
                    
                    return (
                        <CauseCard
                            key={cause.id}
                            id={cause.id}
                            image={imageSrc}  // Pasar la imagen importada
                            title={cause.title}
                            description={cause.description}
                            fullDescription={cause.fullDescription}
                            raised={cause.raised}
                            goal={cause.goal}
                            donationType={cause.donationType}
                            onDonate={handleDonation}
                            itemsNeeded={'itemsNeeded' in cause ? cause.itemsNeeded : undefined}
                            impactMetrics={'impactMetrics' in cause ? cause.impactMetrics : undefined}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Causes;