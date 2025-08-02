import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Web3Provider } from '@/components/Web3Provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FundChain - Crowdfunding Social Blockchain',
  description: 'Plataforma de crowdfunding para causas sociales locales con recompensas NFT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Web3Provider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <Navigation />
            <main className="pt-20">
              {children}
            </main>
            <Toaster />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}