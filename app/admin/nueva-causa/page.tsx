'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function NuevaCausaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    descripcionDetallada: '',
    categoria: '',
    metaTotal: '',
    imagen: ''
  });
  const [hitos, setHitos] = useState([
    { nombre: '', monto: '', descripcion: '' }
  ]);

  const categorias = [
    'Educación',
    'Salud',
    'Medio Ambiente',
    'Capacitación',
    'Alimentación',
    'Infraestructura',
    'Cultura',
    'Deportes'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHitoChange = (index: number, field: string, value: string) => {
    const newHitos = [...hitos];
    newHitos[index][field] = value;
    setHitos(newHitos);
  };

  const addHito = () => {
    setHitos([...hitos, { nombre: '', monto: '', descripcion: '' }]);
  };

  const removeHito = (index: number) => {
    if (hitos.length > 1) {
      setHitos(hitos.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones básicas
    if (!formData.titulo || !formData.descripcion || !formData.metaTotal) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Simulación de creación de causa
    setTimeout(() => {
      toast({
        title: "¡Causa creada exitosamente!",
        description: "Tu causa ha sido publicada y está disponible para donaciones.",
      });
      router.push('/admin');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Nueva Causa Social</h1>
            <p className="text-slate-600 mt-2">Crea una nueva causa para recaudar fondos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título de la Causa *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange('titulo', e.target.value)}
                  placeholder="Ej: Biblioteca Comunitaria San José"
                  required
                />
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción Breve *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  placeholder="Descripción corta que aparecerá en la tarjeta de la causa"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="descripcionDetallada">Descripción Detallada</Label>
                <Textarea
                  id="descripcionDetallada"
                  value={formData.descripcionDetallada}
                  onChange={(e) => handleInputChange('descripcionDetallada', e.target.value)}
                  placeholder="Descripción completa con objetivos, población beneficiada, impacto esperado..."
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select onValueChange={(value) => handleInputChange('categoria', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="metaTotal">Meta de Financiación (USD) *</Label>
                  <Input
                    id="metaTotal"
                    type="number"
                    value={formData.metaTotal}
                    onChange={(e) => handleInputChange('metaTotal', e.target.value)}
                    placeholder="50000"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material multimedia */}
          <Card>
            <CardHeader>
              <CardTitle>Material Multimedia</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="imagen">URL de Imagen Principal</Label>
                <Input
                  id="imagen"
                  value={formData.imagen}
                  onChange={(e) => handleInputChange('imagen', e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <p className="text-sm text-slate-500 mt-1">
                  Por ahora, proporciona la URL de una imagen. Próximamente: subida directa de archivos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hitos de financiación */}
          <Card>
            <CardHeader>
              <CardTitle>Hitos de Financiación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hitos.map((hito, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Hito {index + 1}</h4>
                      {hitos.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeHito(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Nombre del Hito</Label>
                        <Input
                          value={hito.nombre}
                          onChange={(e) => handleHitoChange(index, 'nombre', e.target.value)}
                          placeholder="Ej: Adquisición del terreno"
                        />
                      </div>
                      <div>
                        <Label>Monto (USD)</Label>
                        <Input
                          type="number"
                          value={hito.monto}
                          onChange={(e) => handleHitoChange(index, 'monto', e.target.value)}
                          placeholder="15000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Descripción del Hito</Label>
                      <Textarea
                        value={hito.descripcion}
                        onChange={(e) => handleHitoChange(index, 'descripcion', e.target.value)}
                        placeholder="Describe qué se logrará con este hito"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addHito} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Hito
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Cancelar</Link>
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creando Causa...
                </div>
              ) : (
                'Crear Causa'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}