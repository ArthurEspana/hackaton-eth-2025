'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, Shield, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletButton } from '@/components/WalletButton';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FundChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Causas
            </Link>
            <Link href="/mis-nfts" className="text-slate-600 hover:text-emerald-600 transition-colors">
              Mis NFTs
            </Link>
            <Link href="/admin" className="flex items-center space-x-1 text-slate-600 hover:text-emerald-600 transition-colors">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <WalletButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-slate-600 hover:text-emerald-600">
              Causas
            </Link>
            <Link href="/mis-nfts" className="block px-3 py-2 text-slate-600 hover:text-emerald-600">
              Mis NFTs
            </Link>
            <Link href="/admin" className="block px-3 py-2 text-slate-600 hover:text-emerald-600">
              Admin
            </Link>
            <div className="pt-2">
              <WalletButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}