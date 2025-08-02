import { ArrowRight, Target, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Impulsa Causas Sociales
              </span>
              <br />
              <span className="text-slate-800">con Blockchain</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Conecta con causas locales, dona con transparencia total y recibe NFTs únicos 
              como recompensa por tu impacto social en la comunidad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-6">
              Explorar Causas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/admin">Crear Causa</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transparencia Total</h3>
              <p className="text-slate-600">Seguimiento en tiempo real del uso de fondos con tecnología blockchain</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Seguridad Garantizada</h3>
              <p className="text-slate-600">Contratos inteligentes que aseguran el uso correcto de las donaciones</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">NFTs Únicos</h3>
              <p className="text-slate-600">Recibe NFTs coleccionables por cada donación como prueba de tu impacto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}