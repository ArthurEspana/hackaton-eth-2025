'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Users, Calendar, Target, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CausaDetail({ causa }) {
  const porcentaje = (causa.recaudado / causa.metaTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <img
          src={causa.imagen}
          alt={causa.titulo}
          className="w-full h-64 md:h-80 object-cover rounded-2xl"
        />
        <div className="absolute top-6 left-6">
          <Badge variant="secondary" className="bg-white/90 text-slate-700 text-sm">
            {causa.categoria}
          </Badge>
        </div>
        {causa.verificado && (
          <div className="absolute top-6 right-6">
            <div className="bg-emerald-500 rounded-full p-2">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Título y creador */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-slate-600">{causa.creador}</span>
          {causa.verificado && (
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          {causa.titulo}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {causa.descripcion}
        </p>
      </div>

      {/* Progreso */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                ${causa.recaudado.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Recaudado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {porcentaje.toFixed(0)}%
              </div>
              <div className="text-sm text-slate-600">Completado</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-slate-800">
                <Users className="h-6 w-6" />
                {causa.donadores}
              </div>
              <div className="text-sm text-slate-600">Donadores</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-slate-800">
                <Clock className="h-6 w-6" />
                {causa.diasRestantes}
              </div>
              <div className="text-sm text-slate-600">Días restantes</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Meta: ${causa.metaTotal.toLocaleString()}</span>
              <span>{porcentaje.toFixed(1)}%</span>
            </div>
            <Progress value={porcentaje} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs con contenido detallado */}
      <Tabs defaultValue="descripcion" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="hitos">Hitos</TabsTrigger>
          <TabsTrigger value="actualizaciones">Actualizaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="descripcion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Descripción Detallada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                {causa.descripcionDetallada.split('\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                    return (
                      <h3 key={index} className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.trim().startsWith('- ')) {
                    return (
                      <li key={index} className="text-slate-600 ml-4">
                        {paragraph.replace('- ', '')}
                      </li>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-slate-600 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hitos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Hitos de Financiación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {causa.hitos.map((hito, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      hito.completado ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{hito.nombre}</h4>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${hito.monto.toLocaleString()}</span>
                        {hito.completado && (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{hito.descripcion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actualizaciones" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Actualizaciones del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {causa.actualizaciones.map((update, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-slate-800">{update.titulo}</h4>
                      <span className="text-sm text-slate-500">{update.fecha}</span>
                    </div>
                    <p className="text-slate-600">{update.contenido}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}