import { Heart, Home, Settings } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
      <>
        <DesktopSidebar/>
        <MobileSidebar/>
      </>
    );
};

export default Sidebar;

const DesktopSidebar: React.FC = () => {
  return(  
    <div className=' p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block'>
        <div className='flex flex-col flex-1 m gap-20 sticky top-10 left-0'>
            <div className='flex w-full'>
              <img src='https://www.svgrepo.com/show/123921/cook-hat.svg' alt='logo' className='hidden md:block'/>
              <img src='https://www.svgrepo.com/show/123921/cook-hat.svg' alt='logo' className='block md:hidden'/>
            </div>
            <ul className='flex flex-col flex-1 items-center md:items-start gap-8'>
              <Link to={"/"} className='flex gap-1'>
                <Home size={24}/>
                <span className='font-bold hidden md:block'>Home</span>
              </Link>
              <Link to={"/favorites"} className='flex gap-1'>
                <Heart size={24}/>
                <span className='font-bold hidden md:block'>Favorites</span>
              </Link>
              <Link to={"/settings"} className='flex gap-1 items-center'>
                <Settings size={24}/>
                <span className='font-bold hidden md:block'>Settings</span>
              </Link> 
            </ul>
           
        </div>
    </div>
  )
}

const MobileSidebar: React.FC = () => {
  return(
    <div className='flex justify-center gap-10 border-t fixed w-full bottom-0 left-0 bg-white z-10 p-2 sm:hidden '>
      <Link to={"/"} className='flex gap-1'>
        <Home size={24} className='cursor-pointer'/>
      </Link>
      <Link to={"/favorites"} className='flex gap-1'>
        <Heart size={24} className='cursor-pointer'/>
      </Link>
      <Link to={"/settings"} className='flex gap-1'>
        <Settings size={24} className='cursor-pointer'/>
      </Link>
    </div>
  )
}