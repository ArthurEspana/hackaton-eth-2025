// src/hooks/useCauses.ts
import { useEffect, useState } from 'react';
import type { Cause } from '../types/cause'; // Agregar 'type' aquí
const CAUSES_KEY = 'causes_data';

const initialCauses: Cause[] = [
  {
            id: 1,
            image: 'incendio.png',
            title: 'Ayuda para Brigadistas y Afectados por el Incendio en la Serranía de Sama',
            description: 'Recolectar insumos urgentes para bomberos y voluntarios que combaten el incendio en Tarija',
            fullDescription: `Causa organizada por el Comité Cívico de Tarija, Gobernación de Tarija y ciudadanía.

Objetivo principal:
Recolectar insumos urgentes para los brigadistas y afectados:
- Agua potable
- Alimentos no perecederos
- Medicamentos básicos
- Herramientas para combate de incendios

Tipo de donación:
Esta causa acepta principalmente donaciones en especie (no monetarias).

Puntos de recolección:
- Sede del Comité Cívico de Tarija
- Oficinas de la Gobernación
- Centros de acopio habilitados en la ciudad`,
            raised: 0,
            goal: 0,
            donationType: 'in-kind' as const
        },
  // ... (agrega aquí todas las causas que tenías en tu array original)
  {
            id: 2,
            image: 'santuario.png',
            title: 'SOUL, el primer santuario ecológico de memoria en Bolivia',
            description: 'Crear el primer santuario ecológico del país, combinando la conservación del medio ambiente con un espacio para el recuerdo y el homenaje.',
            fullDescription: `Causa organizada por el Proyecto SOUL (Plataforma UFUND).

Objetivo principal:
Financiar la implementación del primer santuario ecológico en Bolivia, donde los árboles conmemorativos reemplazan las lápidas tradicionales.

Fines del proyecto:
- Promover la sostenibilidad ambiental a través de la reforestación conmemorativa
- Crear un espacio de reflexión, memoria y conexión con la naturaleza
- Sensibilizar sobre prácticas funerarias alternativas y ecológicas

Tipo de donación:
Esta causa acepta donaciones monetarias.

Modalidad:
Las donaciones serán usadas para adquirir plantines, preparar el terreno, y desarrollar la infraestructura básica del santuario.`,
            raised: 50,
            goal: 348000,
            donationType: 'monetary' as const
        },

        {
            id: 3,
            image: 'juvenil.png',
            title: '"Equipando Sueños": Implementos para el Centro Cultural Juvenil',
            description: 'Adquirir equipos básicos (instrumentos, materiales de arte, proyector) para un nuevo centro cultural juvenil autogestionado en el barrio San Matías.',
            fullDescription: `Causa organizada por el Colectivo Artístico "Muro Libre" (Sucre).

Objetivo principal:
Dotar de recursos e infraestructura básica a un nuevo centro cultural comunitario enfocado en jóvenes en situación de vulnerabilidad.

Elementos a financiar:
- Instrumentos musicales (guitarras, tambores, parlantes)
- Materiales de arte (pinturas, pinceles, lienzos)
- Proyector y pantalla para cine comunitario
- Mobiliario básico

Tipo de donación:
Esta causa acepta donaciones monetarias, así como donaciones en especie (equipamiento artístico).

Ubicación del proyecto:
Barrio San Matías, Sucre.`,
            raised: 50,
            goal: 12500,
            donationType: 'monetary' as const
        },

        {
            id: 4,
            image: 'olla_comun.png',
            title: '"Alimento para la Olla Común del Barrio Nuevo Amanecer"',
            description: 'Asegurar la compra de alimentos para mantener una olla común que beneficia a más de 30 familias (120 personas) en inseguridad alimentaria.',
            fullDescription: `Causa organizada por Madres de la Olla Común "Manitos que Alimentan" (Santa Cruz).

Objetivo principal:
Asegurar el abastecimiento regular de alimentos para la olla común que atiende a familias vulnerables del Barrio Nuevo Amanecer.

Artículos requeridos:
- Arroz, fideos, lentejas, aceite, sal
- Verduras y carne
- Gas domiciliario y utensilios

Tipo de donación:
Esta causa acepta donaciones monetarias y donaciones en especie (alimentos y materiales de cocina).

Periodicidad:
La olla común funciona tres veces por semana y busca financiamiento para al menos tres meses consecutivos.`,
            raised: 50,
            goal: 7000,
            donationType: 'monetary' as const
        },

        {
            id: 5,
            image: 'escolar.png',
            title: '"Útiles para Aprender": Campaña de Material Escolar',
            description: 'Dotar de material escolar básico (cuadernos, lápices, libros) a los 45 estudiantes de una escuela rural remota en el Chaco Potosino.',
            fullDescription: `Causa organizada por Profesores y Padres de Familia U.E. "Isla Grande" (Potosí).

Objetivo principal:
Reducir la deserción escolar proporcionando materiales escolares esenciales a los niños y niñas de esta comunidad aislada.

Materiales requeridos:
- Cuadernos, lápices, borradores
- Reglas, tijeras, témperas
- Libros de lectura y diccionarios
- Mochilas resistentes

Tipo de donación:
Esta causa acepta donaciones monetarias y en especie.

Método de entrega:
Los materiales serán entregados en la unidad educativa por los organizadores antes del inicio del siguiente trimestre escolar.`,
            raised: 100,
            goal: 9000,
            donationType: 'monetary' as const
        },

        {
            id: 6,
            image: 'reforestacion.png',
            title: '"Sembrando Vida en la Chiquitania": Reforestación Comunitaria',
            description: 'Comprar plantines de especies nativas y herramientas para reforestar 5 hectáreas de bosque chiquitano afectado por incendios previos.',
            fullDescription: `Causa organizada por Comité de Defensa del Bosque "Monte Verde" (San Ignacio).

Objetivo principal:
Reforestar una zona de 5 hectáreas afectada por incendios forestales, contribuyendo a la recuperación del ecosistema chiquitano.

Necesidades específicas:
- Plantines de tajibo, curupaú, soto, entre otras especies nativas
- Herramientas como palas, picos, regaderas
- Transporte para voluntarios
- Señalización y protección de las áreas reforestadas

Tipo de donación:
Esta causa acepta donaciones monetarias y apoyo logístico.

Metodología:
Las jornadas de reforestación se realizarán en coordinación con escuelas, comunarios y brigadas ecológicas locales.`,
            raised: 100,
            goal: 15000,
            donationType: 'monetary' as const
        },
];

export const useCauses = () => {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del localStorage al iniciar
    const loadCauses = () => {
      try {
        const storedCauses = localStorage.getItem(CAUSES_KEY);
        
        if (storedCauses) {
          setCauses(JSON.parse(storedCauses));
        } else {
          // Si no hay datos, inicializar con los datos por defecto
          localStorage.setItem(CAUSES_KEY, JSON.stringify(initialCauses));
          setCauses(initialCauses);
        }
      } catch (error) {
        console.error('Error al cargar las causas:', error);
        setCauses(initialCauses);
      } finally {
        setIsLoading(false);
      }
    };

    loadCauses();
  }, []);

  const updateCause = (updatedCause: Cause) => {
    try {
      const updatedCauses = causes.map(cause => 
        cause.id === updatedCause.id ? updatedCause : cause
      );
      
      setCauses(updatedCauses);
      localStorage.setItem(CAUSES_KEY, JSON.stringify(updatedCauses));
    } catch (error) {
      console.error('Error al actualizar la causa:', error);
    }
  };

  const getCauseById = (id: number) => {
    return causes.find(cause => cause.id === id);
  };

  return { causes, isLoading, updateCause, getCauseById };
};