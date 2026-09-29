import { openingHours, socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titleSplit = new SplitText("#contact-title", { type: "words" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        ease: "expo.out",
      });

      timeline
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: 100,
          duration: 1.2,
          stagger: 0.05,
        })
        .from(
          ".contact-block",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.1,
          },
          "-=0.8"
        )
        .to(
          "#f-right-leaf",
          {
            y: -80,
            duration: 2,
            ease: "power2.out",
          },
          0
        )
        .to(
          "#f-left-leaf",
          {
            y: -50,
            duration: 2,
            ease: "power2.out",
          },
          0
        );
    },
    { scope: containerRef }
  );

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" });
  };
  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <footer id="contact" ref={containerRef} className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden py-20 px-5 radial-gradient text-left">
      {/* Decorative Leaves */}
      <img
        src="/images/footer-right-leaf.png"
        alt=""
        aria-hidden="true"
        id="f-right-leaf"
        className="absolute top-0 -right-10 pointer-events-none hidden lg:block parallax-leaf-inverse z-0 opacity-80"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt=""
        aria-hidden="true"
        id="f-left-leaf"
        className="absolute -bottom-10 -left-10 pointer-events-none w-1/3 lg:w-fit parallax-leaf z-0 opacity-80"
      />

      <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Left Column - Giant Typography */}
        <div className="flex flex-col lg:col-span-5">
          <p className="text-yellow font-sans tracking-widest uppercase text-xs mb-6 contact-block font-semibold">
            Let's grab a drink
          </p>
          <h2 id="contact-title" className="text-6xl md:text-8xl 2xl:text-9xl font-modern-negra leading-none mb-8">
            Where to <br /> Find Us
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-sm contact-block leading-relaxed">
            Whether you're looking for a classic mojito or a bold new twist, 
            our doors are open and the bar is fully stocked.
          </p>
        </div>

        {/* Right Column - Bento Box Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-7 w-full text-left">
          
          <div className="contact-block bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 group flex flex-col justify-center">
            <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-6 font-bold">Visit Our Bar</h3>
            <p className="text-lg lg:text-xl font-serif text-white/90 leading-snug group-hover:text-white transition-colors">
              456, Raq Blvd. #404,
              Los Angeles, CA 90210
            </p>
          </div>

          <div className="contact-block bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 flex flex-col justify-center">
            <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-6 font-bold">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-lg lg:text-xl font-serif text-white/90 hover:text-yellow transition-colors cursor-pointer inline-block">(555) 987-6543</p>
              <br/>
              <p className="text-lg lg:text-xl font-serif text-white/90 hover:text-yellow transition-colors cursor-pointer inline-block">hello@jsmcocktail.com</p>
            </div>
          </div>

          <div className="contact-block bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex-1 w-full max-w-sm">
              <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-6 font-bold">Open Every Day</h3>
              <div className="flex flex-col gap-3">
                {openingHours.map((time) => (
                  <div key={time.day} className="flex justify-between items-center font-serif text-base lg:text-lg border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-white/90">{time.day}</span>
                    <span className="text-white/50">{time.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-6 font-bold md:text-right">Socials</h3>
              <div className="flex gap-4 md:justify-end">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-yellow hover:border-yellow transition-all duration-300 group inline-flex items-center justify-center"
                    onMouseMove={handleMagnetic}
                    onMouseLeave={resetMagnetic}
                  >
                    <img 
                      src={social.icon} 
                      alt="" 
                      className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:brightness-0 transition-all duration-300" 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Contact;