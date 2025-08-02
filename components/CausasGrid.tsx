'use client';

import { useState, useEffect } from 'react';
import { CausaCard } from '@/components/CausaCard';

// Datos de ejemplo para las causas
const mockCausas = [
  {
    id: '1',
    titulo: 'Biblioteca Comunitaria San José',
    descripcion: 'Construcción de una biblioteca comunitaria para niños y jóvenes del barrio San José, promoviendo la educación y el acceso gratuito a libros.',
    imagen: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTotal: 50000,
    recaudado: 32500,
    donadores: 89,
    diasRestantes: 23,
    categoria: 'Educación',
    creador: 'Fundación Educativa',
    verificado: true
  },
  {
    id: '2',
    titulo: 'Huerto Urbano Sostenible',
    descripcion: 'Creación de huertos urbanos en azoteas para familias de bajos recursos, promoviendo la seguridad alimentaria y la sostenibilidad.',
    imagen: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTotal: 25000,
    recaudado: 18750,
    donadores: 56,
    diasRestantes: 45,
    categoria: 'Medio Ambiente',
    creador: 'EcoVerde Comunidad',
    verificado: true
  },
  {
    id: '3',
    titulo: 'Centro de Capacitación Técnica',
    descripcion: 'Equipamiento de un centro de capacitación técnica para jóvenes en situación de vulnerabilidad, ofreciendo formación en oficios.',
    imagen: 'https://images.pexels.com/photos/8349271/pexels-photo-8349271.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTotal: 75000,
    recaudado: 45000,
    donadores: 134,
    diasRestantes: 12,
    categoria: 'Capacitación',
    creador: 'Centro Integral',
    verificado: true
  },
  {
    id: '4',
    titulo: 'Comedores Escolares Rurales',
    descripcion: 'Implementación de comedores escolares en escuelas rurales para garantizar la alimentación nutritiva de niños en edad escolar.',
    imagen: 'https://images.pexels.com/photos/8617752/pexels-photo-8617752.jpeg?auto=compress&cs=tinysrgb&w=800',
    metaTotal: 40000,
    recaudado: 12000,
    donadores: 43,
    diasRestantes: 67,
    categoria: 'Alimentación',
    creador: 'Nutrición Rural',
    verificado: false
  }
];

export function CausasGrid() {
  const [causas, setCausas] = useState<typeof mockCausas>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setCausas(mockCausas);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Causas Activas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse">
                <div className="bg-slate-200 h-48 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Causas Activas
          </h2>
          <p className="text-slate-600 text-lg">
            Apoya las iniciativas que están transformando comunidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {causas.map((causa) => (
            <CausaCard key={causa.id} causa={causa} />
          ))}
        </div>
      </div>
    </section>
  );
}