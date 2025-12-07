import React, {useState, useEffect} from 'react'
import Menu from './menu.jsx';

const NavBar = () => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(()=> {
    const handleResize =()=> {
      if(window.innerWidth <= 768) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if(isMobile) {
    return(
      <div className="w-full h-12 rounded-b-lg bg-white fixed top-0 left-0 z-50 flex items-center justify-between px-7">
      <a href="/" className="pixelify text-xl  text-gray-800 font-bold ">PharmFlow</a>
      <div className="flex flex-row justify-between items-center py-4 space-x-8">
       <Menu />
      </div>
    </div>
    )
  }
  return (
    <div className="w-4/5 h-12 rounded-full bg-white fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-around md:justify-between px-4 md:px-5">
      <a href="/" className="pixelify text-xl  text-gray-800 ">PharmFlow</a>
      <div className="flex flex-row justify-between items-center py-4 space-x-8">
        <a href="#" className="text-gray-800 cursor-pointer">Home</a>
        <a href="#" className="text-gray-800 cursor-pointer">Contact</a>
        <a href="/register" className="bg-gray-800 cursor-pointer text-white px-4 py-[5.5px] rounded-full ">Register</a>
      </div>
    </div>
    ) 
  };

export default NavBar
