import NavBar from '../components/NavBar'
import Pattern from '../components/pattern'
import Lenis from 'lenis'
import {useEffect} from 'react'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    }
  }, [])

   return (
      <main className="w-full min-h-screen bg-[#ECE6FF] scroll-smooth relative overflow-x-hidden scrollb">
     
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Pattern/>
            </div>
            <div className="absolute top-0 w-full z-50">
                <NavBar/>
            </div>
            <div className="z-10 text-center max-w-5xl px-6">
                <h1 className="text-4xl md:text-7xl font-bold text-white pixelify mb-6 leading-tight">
                   Revolutionizing Pharmacy Management
                </h1>
                <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto text-indigo-100">
                   Seamless inventory, smart tracking, and superior patient care—all in one unified platform.
                </p>
             </div>
             <div className="absolute bottom-10 {/*animate-bounce*/} z-20">
               <a href="#next-section">
                 <img src="./image.png" alt="Down arrow"  className='size-14 rotate-45'/>
               </a>
             </div>
        </section>

      
        <section id="next-section" className="w-full h-fit flex justify-center items-center ">
            <h1 className='text-xl'>Hi</h1>
        </section>
      </main>
  )
}

export default App
