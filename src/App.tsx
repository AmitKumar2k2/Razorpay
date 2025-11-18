import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductHighlights from './components/ProductHighlights';
import Benefits from './components/Benefits';
import TrustedBy from './components/TrustedBy';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Features />
        <ProductHighlights />
        <Benefits />
        <Footer />
      </div>
    </div>
  );
}

export default App;
