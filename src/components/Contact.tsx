import { storeInfo } from "../../constants";
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

        {/* Right Column - Contact Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-7 w-full text-left">
          
          {/* Contact Form */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 md:col-span-2 flex flex-col">
            <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-6 font-bold">Send us a message</h3>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:outline-none focus:border-yellow transition-colors font-serif placeholder:text-white/30" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:outline-none focus:border-yellow transition-colors font-serif placeholder:text-white/30" 
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:outline-none focus:border-yellow transition-colors font-serif placeholder:text-white/30" 
              />
              <textarea 
                placeholder="Message" 
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:outline-none focus:border-yellow transition-colors font-serif resize-none placeholder:text-white/30"
              ></textarea>
              <button 
                type="submit" 
                className="w-full py-4 bg-yellow text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Address */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 flex flex-col justify-center">
            <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-4 font-bold">Visit Our Bar</h3>
            <p className="text-base lg:text-lg font-serif text-white/90 leading-snug">
              {storeInfo.address}
            </p>
          </div>

          {/* Contact Details */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.06] transition-all duration-500 flex flex-col justify-center">
            <h3 className="uppercase text-yellow tracking-[0.2em] text-xs mb-4 font-bold">Contact Us</h3>
            <p className="text-base lg:text-lg font-serif text-white/90 hover:text-yellow transition-colors cursor-pointer inline-block">{storeInfo.contact.phone}</p>
            <p className="text-base lg:text-lg font-serif text-white/90 hover:text-yellow transition-colors cursor-pointer inline-block mt-2">{storeInfo.contact.email}</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Contact;