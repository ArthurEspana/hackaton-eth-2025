'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Heart, Award } from 'lucide-react';

export function Stats() {
  const [stats, setStats] = useState({
    totalRecaudado: 0,
    causasActivas: 0,
    donadores: 0,
    nftsCreados: 0
  });

  useEffect(() => {
    // Simulación de carga de estadísticas
    const timer = setTimeout(() => {
      setStats({
        totalRecaudado: 248500,
        causasActivas: 24,
        donadores: 1247,
        nftsCreados: 3892
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      icon: TrendingUp,
      label: 'Total Recaudado',
      value: `$${stats.totalRecaudado.toLocaleString()}`,
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Heart,
      label: 'Causas Activas',
      value: stats.causasActivas.toString(),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      label: 'Donadores',
      value: stats.donadores.toLocaleString(),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      label: 'NFTs Creados',
      value: stats.nftsCreados.toLocaleString(),
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Impacto en Números
          </h2>
          <p className="text-slate-600 text-lg">
            El resultado de la colaboración comunitaria
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {item.value}
              </div>
              <div className="text-slate-600 text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}