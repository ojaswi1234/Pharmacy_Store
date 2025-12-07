import NavBar from '../../components/NavBar.jsx'
import Pattern from '../../components/pattern'
import Lenis from 'lenis'
import {useEffect, useRef, useState} from 'react'
import Card from '../../components/card.jsx'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const lenisRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll, limit }) => {
      const progress = (scroll / limit) * 100;
      setScrollProgress(progress);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    lenisRef.current?.scrollTo(element, { offset: 0, duration: 1.5 });
  };

  return (
    <main className="w-full min-h-screen bg-black scroll-smooth relative overflow-x-hidden scrollb">
      
    
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[100]">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

    
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {['#hero', '#features', '#how-it-works', '#stats', '#testimonials', '#pricing', '#footer'].map((id, idx) => (
          <button 
            key={id}
            onClick={() => scrollToSection(id)}
            className={`w-3 h-3 rounded-full transition-all ${
              scrollProgress >= idx * (100 / 7) && scrollProgress < (idx + 1) * (100 / 7) 
                ? 'bg-indigo-600 scale-125' 
                : 'bg-gray-400'
            }`}
            aria-label={`Scroll to ${id.slice(1)}`}
          />
        ))}
      </div>

     
      <section 
        id="hero"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-40 "> {/* Opacity 40% ensures it doesn't distract */}
        <Pattern />
      </div>
      <div className="absolute inset-0 z-0 opacity-40 "> {/* Opacity 40% ensures it doesn't distract */}
        <Pattern />
      </div>
        <div className="absolute top-0 w-full z-50">
          <NavBar/>
        </div>
        <div 
          className={`z-10 text-center max-w-5xl px-6 transition-all duration-1000 ${
            isVisible['hero'] !== false ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white pixelify mb-6 leading-tight">
            Making Life Easier for Pharmacy Admins
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto text-indigo-100 mb-8">
            Keep your pharmacy running smoothly, track inventory like a pro, and focus on what matters most—taking care of your patients.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-indigo-50 transition-all cursor-pointer">
              Let's Get Started
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all cursor-pointer">
              Check Out the Demo
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 z-20 animate-bounce">
          <button onClick={() => scrollToSection('#features')}>
            <img src="./image.png" alt="Down arrow" className='size-14 rotate-45'/>
          </button>
        </div>
      </section>

     
      <section 
        id="features" 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="w-full h-fit flex justify-center items-center py-20"
      >
        <div className="pixelify max-w-7xl px-6">
          <h2 
            className={`text-3xl md:text-5xl font-bold text-white mb-6 text-center transition-all duration-1000 delay-100 ${
              isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Built for Busy Pharmacy Admins
          </h2>
          <p 
            className={`pixelify text-md md:text-xl text-gray-300 text-center mb-16 transition-all duration-1000 delay-200 ${
              isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Simplify your workflow with easy-to-use tools that save you time and hassle.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Quick Inventory Check", description: "Monitor stock levels in real-time and get notified when supplies are running low" },
              { title: "Auto Restock", description: "Smart reordering so you never run out of essentials" },
              { title: "Safe Ordering", description: "Secure and traceable purchases every single time" },
              { title: "Patient Tips", description: "Track medications and send friendly reminders to keep patients on track" }
            ].map((card, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible['features'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <Card title={card.title} description={card.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="how-it-works"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="w-full h-fit flex justify-center items-center py-20 bg-white text-black"
      >
        <div className="max-w-7xl px-6">
          <h2 
            className={`text-3xl md:text-5xl font-bold  mb-6 text-center pixelify transition-all duration-1000 delay-100 ${
              isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            How It Works (Step-by-Step Process)
          </h2>
          <p 
            className={`text-md md:text-xl  text-center mb-16 transition-all duration-1000 delay-200 ${
              isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Get started in just a few simple steps and streamline your pharmacy management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <svg className="w-16 h-16 text-indigo-600" fill="black" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>, title: "Sign Up", description: "Create your account and set up your pharmacy profile quickly and securely." },
              { icon: <svg className="w-16 h-16 text-indigo-600" fill="black" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/></svg>, title: "Set Up Inventory", description: "Import or manually add your current stock to start tracking in real-time." },
              { icon: <svg className="w-16 h-16 text-indigo-600" fill="black" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>, title: "Monitor & Manage", description: "Use dashboards to oversee operations, receive alerts, and manage orders effortlessly." },
              { icon: <svg className="w-16 h-16 text-indigo-600" fill="black" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>, title: "Get Support", description: "Access 24/7 help from our team to ensure smooth sailing every step of the way." }
            ].map((step, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 p-8 rounded-xl  ${
                  isVisible['how-it-works'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
     
     
      <section 
        id="testimonials"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="w-full py-20 bg-black"
      >
        <div className="max-w-7xl mx-auto px-6 ">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center pixelify">
            Loved by Pharmacy Pros
          </h2>
          <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Hear from fellow admins who've transformed their pharmacies and made a real difference for their teams and patients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sanjay Rajput", role: "Head Pharmacist", location: "MedCare Pharmacy", quote: "This tool saved us 15 hours a week! The auto inventory feature is a game-changer for our hectic schedule." },
              { name: "Meera Arora", role: "Pharmacy Owner", location: "MedTown Health", quote: "Best investment we've made. The support team is fantastic, and we saw improvements right away." },
              { name: "Aman Gupta", role: "Inventory Manager", location: "CityMed Pharmacy", quote: "So user-friendly and feature-packed. Our team got up to speed quickly, and the efficiency boost is incredible!" }
            ].map((testimonial, idx) => (
              <div 
                key={idx}
                className={`bg-indigo-50 p-6 rounded-xl transition-all duration-700 hover:shadow-lg ${
                  isVisible['testimonials'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.quote}"</p>
                <div className="border-t border-indigo-200 pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <footer 
        id="footer"
        ref={(el) => (sectionsRef.current[5] = el)}
        className="w-full bg-gray-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">Ready to simplify your pharmacy management?</p>
          <button className="px-8 py-3 cursor-pointer bg-indigo-600 rounded-lg font-bold hover:bg-indigo-700 transition-all mb-8">
            Start Now
          </button>
          <p className="text-gray-400 text-sm">© 2024 Pharmacy Store. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default App