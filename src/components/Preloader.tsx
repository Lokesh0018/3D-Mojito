import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
      },
    });

    // Animate the counter
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(this.targets()[0].val) + '%';
          }
        },
      }
    );

    // Slide up the preloader
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut',
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="overflow-hidden">
        <h1 className="font-modern-negra text-5xl md:text-8xl tracking-widest text-white">
          MOJITO
        </h1>
      </div>
      <div className="mt-5 overflow-hidden">
        <h2 ref={counterRef} className="font-sans text-3xl font-light text-yellow">
          0%
        </h2>
      </div>
    </div>
  );
};

export default Preloader;
