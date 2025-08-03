// src/components/Stats/Stats.tsx
import StatItem from './StatItem';
import './Stats.css';

const Stats = () => {
  const stats = [
    { value: "$248.500", label: "Total Recaudado" },
    { value: "24", label: "Causas Activas" },
    { value: "1.247", label: "Donadores" },
    { value: "3.892", label: "NFTs Creados" }
  ];

  return (
    <section className="stats-section">
      <h2>Impacto en Números</h2>
      <h3>El resultado de la colaboración comunitaria</h3>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatItem 
            key={index}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;