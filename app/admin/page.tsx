'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, TrendingUp, Users, DollarSign, Eye, Edit, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWeb3 } from '@/components/Web3Provider';

export default function AdminPage() {
  const { isConnected, connectWallet } = useWeb3();
  const [causas, setCausas] = useState([]);
  const [stats, setStats] = useState({
    totalRecaudado: 0,
    causasActivas: 0,
    totalDonadores: 0
  });

  useEffect(() => {
    // Simulación de datos del administrador
    const mockCausas = [
      {
        id: '1',
        titulo: 'Biblioteca Comunitaria San José',
        estado: 'activa',
        recaudado: 32500,
        meta: 50000,
        donadores: 89,
        fechaCreación: '2024-01-01',
        ultimaActualizacion: '2024-01-15'
      },
      {
        id: '2',
        titulo: 'Huerto Urbano Sostenible',
        estado: 'activa',
        recaudado: 18750,
        meta: 25000,
        donadores: 56,
        fechaCreación: '2023-12-15',
        ultimaActualizacion: '2024-01-10'
      }
    ];

    setCausas(mockCausas);
    setStats({
      totalRecaudado: mockCausas.reduce((acc, causa) => acc + causa.recaudado, 0),
      causasActivas: mockCausas.filter(causa => causa.estado === 'activa').length,
      totalDonadores: mockCausas.reduce((acc, causa) => acc + causa.donadores, 0)
    });
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Panel de Administrador</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Conecta tu wallet para acceder al panel de administración y gestionar tus causas.
            </p>
            <Button onClick={connectWallet} className="w-full">
              Conectar Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Administrador</h1>
            <p className="text-slate-600 mt-2">Gestiona tus causas y monitorea el progreso</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            <Link href="/admin/nueva-causa">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Causa
            </Link>
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recaudado</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                ${stats.totalRecaudado.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Causas Activas</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.causasActivas}
              </div>
              <p className="text-xs text-slate-500">
                2 nuevas este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donadores</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalDonadores}
              </div>
              <p className="text-xs text-slate-500">
                +23 nuevos donadores
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de causas */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Causas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {causas.map((causa) => (
                <div key={causa.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{causa.titulo}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Creada: {causa.fechaCreación}</span>
                        <span>Actualizada: {causa.ultimaActualizacion}</span>
                      </div>
                    </div>
                    <Badge variant={causa.estado === 'activa' ? 'default' : 'secondary'}>
                      {causa.estado}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-semibold text-emerald-600">
                        ${causa.recaudado.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">
                        de ${causa.meta.toLocaleString()} ({((causa.recaudado / causa.meta) * 100).toFixed(0)}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800">
                        {causa.donadores}
                      </div>
                      <div className="text-sm text-slate-600">Donadores</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/causa/${causa.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Actualizar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {causas.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No tienes causas creadas aún</p>
                  <Button asChild>
                    <Link href="/admin/nueva-causa">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear tu primera causa
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}