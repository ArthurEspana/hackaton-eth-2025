// src/components/Stats/StatItem.tsx
import "./Stats.css";

type StatItemProps = {
  value: string;
  label: string;
};

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <div className="stat-item">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatItem;
