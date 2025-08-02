import Link from 'next/link';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Causa {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  metaTotal: number;
  recaudado: number;
  donadores: number;
  diasRestantes: number;
  categoria: string;
  creador: string;
  verificado: boolean;
}

interface CausaCardProps {
  causa: Causa;
}

export function CausaCard({ causa }: CausaCardProps) {
  const porcentaje = (causa.recaudado / causa.metaTotal) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
      <div className="relative">
        <img
          src={causa.imagen}
          alt={causa.titulo}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-slate-700">
            {causa.categoria}
          </Badge>
        </div>
        {causa.verificado && (
          <div className="absolute top-4 right-4">
            <div className="bg-emerald-500 rounded-full p-1">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-slate-600">{causa.creador}</span>
          {causa.verificado && (
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
          {causa.titulo}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {causa.descripcion}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Progreso</span>
              <span className="font-medium">{porcentaje.toFixed(0)}%</span>
            </div>
            <Progress value={porcentaje} className="h-2" />
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <div className="font-semibold text-slate-800">
                ${causa.recaudado.toLocaleString()}
              </div>
              <div className="text-slate-600">
                de ${causa.metaTotal.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-slate-600">
                <Users className="h-4 w-4" />
                <span>{causa.donadores}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="h-4 w-4" />
                <span>{causa.diasRestantes}d</span>
              </div>
            </div>
          </div>

          <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            <Link href={`/causa/${causa.id}`}>
              Ver Detalles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}