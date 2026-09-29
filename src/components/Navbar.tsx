import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { navLinks } from '../../constants/index.ts'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            rootMargin: '-40% 0px -40% 0px'
        });

        navLinks.forEach((link) => {
            const section = document.getElementById(link.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050', 
            backgroundFilter: 'blur(10px)',  
            duration: 1,
            ease: 'power2.inOut',
        })
    })

  return (
    <nav>
        <div className="!flex-row !justify-between w-full">
            <a 
                href="#" 
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 z-50 relative"
            >
                <img src="/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a 
                            href={`#${link.id}`}
                            className={`transition-colors duration-300 ${activeSection === link.id ? 'text-yellow font-semibold' : 'hover:text-yellow'}`}
                        >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden z-50 relative flex flex-col justify-center items-center gap-1.5 focus:outline-none w-8 h-8"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
            >
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 md:hidden z-40 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col items-center gap-8 !m-0 !p-0">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a 
                                href={`#${link.id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-2xl transition-colors duration-300 ${activeSection === link.id ? 'text-yellow font-semibold' : 'hover:text-yellow'}`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar