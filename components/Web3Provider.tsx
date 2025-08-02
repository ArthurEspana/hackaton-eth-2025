'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    // Simulación de conexión de wallet
    // En producción, aquí iría la lógica real de Web3
    try {
      // Simular dirección de wallet
      const mockAccount = '0x' + Math.random().toString(16).substr(2, 40);
      const mockBalance = (Math.random() * 10).toFixed(4);
      
      setAccount(mockAccount);
      setBalance(mockBalance);
      setIsConnected(true);
      
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_account', mockAccount);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
    setIsConnected(false);
    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_account');
  };

  useEffect(() => {
    // Verificar si había una wallet conectada anteriormente
    const wasConnected = localStorage.getItem('wallet_connected');
    const savedAccount = localStorage.getItem('wallet_account');
    
    if (wasConnected && savedAccount) {
      setAccount(savedAccount);
      setBalance((Math.random() * 10).toFixed(4));
      setIsConnected(true);
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      isConnected,
      account,
      balance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}