'use client';

import { useState, useEffect } from 'react';
import { Award, Calendar, ExternalLink, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/components/Web3Provider';

export default function MisNFTsPage() {
  const { isConnected, connectWallet } = useWeb3();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      // Simulación de carga de NFTs
      const mockNFTs = [
        {
          id: '1',
          titulo: 'Biblioteca Comunitaria #001',
          causa: 'Biblioteca Comunitaria San José',
          donacion: 50,
          fecha: '2024-01-15',
          imagen: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=400',
          tokenId: 'BCS001',
          rareza: 'Común',
          atributos: [
            { tipo: 'Categoría', valor: 'Educación' },
            { tipo: 'Donación', valor: '$50' },
            { tipo: 'Impacto', valor: 'Alto' }
          ]
        },
        {
          id: '2',
          titulo: 'Huerto Urbano #042',
          causa: 'Huerto Urbano Sostenible',
          donacion: 25,
          fecha: '2024-01-08',
          imagen: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
          tokenId: 'HUS042',
          rareza: 'Raro',
          atributos: [
            { tipo: 'Categoría', valor: 'Medio Ambiente' },
            { tipo: 'Donación', valor: '$25' },
            { tipo: 'Impacto', valor: 'Medio' }
          ]
        },
        {
          id: '3',
          titulo: 'Centro Capacitación #078',
          causa: 'Centro de Capacitación Técnica',
          donacion: 100,
          fecha: '2024-01-02',
          imagen: 'https://images.pexels.com/photos/8349271/pexels-photo-8349271.jpeg?auto=compress&cs=tinysrgb&w=400',
          tokenId: 'CCT078',
          rareza: 'Épico',
          atributos: [
            { tipo: 'Categoría', valor: 'Capacitación' },
            { tipo: 'Donación', valor: '$100' },
            { tipo: 'Impacto', valor: 'Alto' }
          ]
        }
      ];

      setTimeout(() => {
        setNfts(mockNFTs);
        setLoading(false);
      }, 1000);
    }
  }, [isConnected]);

  const getRarezaColor = (rareza: string) => {
    switch (rareza.toLowerCase()) {
      case 'común': return 'bg-slate-100 text-slate-800';
      case 'raro': return 'bg-blue-100 text-blue-800';
      case 'épico': return 'bg-purple-100 text-purple-800';
      case 'legendario': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Mis NFTs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Conecta tu wallet para ver tus NFTs obtenidos por donaciones.
            </p>
            <Button onClick={connectWallet} className="w-full">
              Conectar Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Mis NFTs</h1>
            <p className="text-slate-600 mt-2">Colección de NFTs obtenidos por tus donaciones</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Mis NFTs</h1>
          <p className="text-slate-600 mt-2">
            Colección de {nfts.length} NFTs obtenidos por tus donaciones
          </p>
        </div>

        {nfts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Gift className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No tienes NFTs aún
              </h3>
              <p className="text-slate-600 mb-4">
                Haz una donación a cualquier causa para recibir tu primer NFT único
              </p>
              <Button asChild>
                <a href="/">Explorar Causas</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={nft.imagen}
                    alt={nft.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getRarezaColor(nft.rareza)}>
                      {nft.rareza}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{nft.titulo}</CardTitle>
                  <p className="text-slate-600 text-sm">{nft.causa}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Token ID:</span>
                    <span className="font-mono">{nft.tokenId}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Donación:</span>
                    <span className="font-semibold text-emerald-600">
                      ${nft.donacion}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>{nft.fecha}</span>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-slate-800 mb-2">Atributos</h4>
                    <div className="space-y-1">
                      {nft.atributos.map((attr, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-slate-600">{attr.tipo}:</span>
                          <span>{attr.valor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en OpenSea
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}