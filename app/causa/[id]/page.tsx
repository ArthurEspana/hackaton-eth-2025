'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CausaDetail } from '@/components/CausaDetail';
import { DonationForm } from '@/components/DonationForm';

export default function CausaPage() {
  const params = useParams();
  const [causa, setCausa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos de la causa
    const mockCausa = {
      id: params.id,
      titulo: 'Biblioteca Comunitaria San José',
      descripcion: 'Construcción de una biblioteca comunitaria para niños y jóvenes del barrio San José, promoviendo la educación y el acceso gratuito a libros.',
      descripcionDetallada: `
        El proyecto "Biblioteca Comunitaria San José" busca crear un espacio educativo y cultural 
        en el corazón del barrio San José, una zona que actualmente carece de infraestructura 
        educativa adecuada para sus más de 500 familias.

        **Objetivos del Proyecto:**
        - Construir una biblioteca de 150m² con capacidad para 80 personas
        - Crear una colección inicial de 5,000 libros en español
        - Implementar un laboratorio de computación con 10 equipos
        - Establecer programas de lectura para niños y adultos mayores
        - Generar 8 empleos directos en la comunidad

        **Población Beneficiada:**
        - 300 niños y adolescentes en edad escolar
        - 150 adultos que buscan capacitación
        - 50 adultos mayores del programa de alfabetización
        - Familias completas que utilizarán el espacio para actividades culturales

        **Impacto Esperado:**
        Este proyecto transformará el acceso a la educación en el barrio, proporcionando 
        un espacio seguro y equipado donde la comunidad puede aprender, crecer y desarrollarse.
      `,
      imagen: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1200',
      metaTotal: 50000,
      recaudado: 32500,
      donadores: 89,
      diasRestantes: 23,
      categoria: 'Educación',
      creador: 'Fundación Educativa',
      verificado: true,
      hitos: [
        {
          nombre: 'Adquisición del terreno',
          monto: 15000,
          completado: true,
          descripcion: 'Compra y legalización del terreno para la biblioteca'
        },
        {
          nombre: 'Construcción de la estructura',
          monto: 25000,
          completado: false,
          descripcion: 'Construcción de las instalaciones principales'
        },
        {
          nombre: 'Equipamiento y libros',
          monto: 10000,
          completado: false,
          descripcion: 'Compra de mobiliario, equipos y colección inicial de libros'
        }
      ],
      actualizaciones: [
        {
          fecha: '2024-01-15',
          titulo: 'Terreno adquirido exitosamente',
          contenido: 'Hemos completado la compra del terreno y todos los permisos están en orden. ¡Gracias a todos los donadores!'
        },
        {
          fecha: '2024-01-08',
          titulo: 'Alcanzamos el primer hito',
          contenido: 'Superamos la meta del primer hito. Los planos arquitectónicos están listos y comenzaremos la construcción pronto.'
        }
      ]
    };

    setTimeout(() => {
      setCausa(mockCausa);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!causa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Causa no encontrada</h1>
          <p className="text-slate-600">La causa que buscas no existe o ha sido removida.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CausaDetail causa={causa} />
          </div>
          <div className="lg:col-span-1">
            <DonationForm causa={causa} />
          </div>
        </div>
      </div>
    </div>
  );
}