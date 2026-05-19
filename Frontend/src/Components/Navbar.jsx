import React, { useContext } from 'react'
import { StoreContext } from "../context/storeContext.jsx";
import { navbarStyles } from '../assets/dummyStyles'
import img1 from '../assets/logo.png';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
  const { logOut, user } = useContext(StoreContext);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className='flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto'>
        <div onClick={() => {
          Navigate('/')
        }} className='flex items-center gap-0 cursor-pointer'>
          <div className='w-15 h-15 rounded-xl overflow-hidden'>
            <img src={img1} alt="logo" />
          </div>
          <span className='lg:text-3xl md:text-3xl text-2xl text-gray-900 font-[550] lobster-regular' >
            Expanse Tracker
          </span>
        </div>
        {/* if the user is present */}
      </div>
    </header>
  )
}

export default Navbar