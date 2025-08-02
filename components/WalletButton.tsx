'use client';

import { Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/components/Web3Provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WalletButton() {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWeb3();

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
        <Wallet className="h-4 w-4 mr-2" />
        Conectar Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-emerald-50 border-emerald-200 hover:bg-emerald-100">
          <Wallet className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          <span className="sm:hidden">Wallet</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-3 border-b">
          <p className="text-sm font-medium">Dirección</p>
          <p className="text-xs text-slate-500 font-mono">{account}</p>
          <p className="text-sm font-medium mt-2">Balance</p>
          <p className="text-xs text-slate-500">{balance} ETH</p>
        </div>
        <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}