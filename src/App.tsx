
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import './index.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';
import Art from './components/Art';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40; 
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.parallax-leaf', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out'
      });
      
      gsap.to('.parallax-leaf-inverse', {
        x: -xPos,
        y: -yPos,
        duration: 1,
        ease: 'power2.out'
      });
    };

    if (appLoaded) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [appLoaded]);

  return (
    <main>
        {!appLoaded && <Preloader onComplete={() => setAppLoaded(true)} />}
        <Navbar />
        <Hero />
        <Cocktails />
        <About />
        <Art />
        <Menu />
        <Contact />
    </main>
  )
}

export default App;