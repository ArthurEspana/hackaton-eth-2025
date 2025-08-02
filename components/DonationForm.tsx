'use client';

import { useState } from 'react';
import { Heart, Gift, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWeb3 } from '@/components/Web3Provider';
import { useToast } from '@/hooks/use-toast';

export function DonationForm({ causa }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { isConnected, connectWallet } = useWeb3();
  const { toast } = useToast();

  const presetAmounts = [10, 25, 50, 100];

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulación de donación
    setTimeout(() => {
      toast({
        title: "¡Donación exitosa!",
        description: `Has donado $${amount} a ${causa.titulo}. Tu NFT único será enviado a tu wallet.`,
      });
      setAmount('');
      setLoading(false);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Conecta tu Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">
            Conecta tu wallet para hacer una donación y recibir tu NFT único como recompensa.
          </p>
          <Button onClick={connectWallet} className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            <Wallet className="h-4 w-4 mr-2" />
            Conectar Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-emerald-500" />
            Hacer Donación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Monto de donación (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                variant="outline"
                onClick={() => setAmount(preset.toString())}
                className="hover:bg-emerald-50 hover:border-emerald-300"
              >
                ${preset}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleDonate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Procesando...
              </div>
            ) : (
              <>
                Donar ${amount || '0'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-500" />
            Recompensa NFT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-slate-800 mb-2">NFT Exclusivo</h4>
            <p className="text-sm text-slate-600 mb-3">
              Al donar a esta causa, recibirás un NFT único y coleccionable que representa tu contribución al impacto social.
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Gift className="h-4 w-4" />
              <span>Certificado digital de tu donación</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}