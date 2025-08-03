// src/pages/Home/Home.tsx
import Features from '../../components/Features/Features';
import Stats from '../../../components/Causes
import Link from 'next/link';
import './Home.css';

const Home = () => {
  return (
    <main className="main-content">
      <section className="welcome-section">
        <h1>Impulsa la conservación de la vida natural</h1>
        <h2>con blockchain</h2>
        <p className="description">
          Conecta con causas locales, dona con transparencia total y recibe NFTs únicos como recompensa por tu impacto social en la comunidad.
        </p>
        <Link href="/causes" className="explore-button">
  Explorar Causas
</Link>
      </section>
      
      <Features />
      <Stats />
    </main>
  );
};

export default Home;