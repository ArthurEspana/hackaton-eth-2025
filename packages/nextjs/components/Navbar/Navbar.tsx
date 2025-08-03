// src/components/Navbar/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const handleConnectWallet = () => {
    console.log("Conectando wallet..."); // Lógica para conectar wallet
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          {/* Envuelve el logo y el texto en un Link para navegar a Home */}
          <Image src={logoImg} alt="Qura Logo" width={48} height={48} />
          <h2>Qura</h2>
        </Link>
      </div>
      <div className="navbar-links">
        <button className="wallet-button" onClick={handleConnectWallet}>
          Conectar Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
