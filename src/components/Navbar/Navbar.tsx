// src/components/Navbar/Navbar.tsx
import './Navbar.css';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImg} alt="Qura Logo" />
        <h2>Qura</h2>
      </div>
      <div className="navbar-links">
        <button className="wallet-button">Conectar Wallet</button>
      </div>
    </nav>
  );
};

export default Navbar;