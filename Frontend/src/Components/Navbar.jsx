import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from "../context/storeContext.jsx";
import { navbarStyles } from '../assets/dummyStyles'
import img1 from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User } from 'lucide-react';
import axios from 'axios';


const Navbar = (prop) => {
  const { logOut, url ,user,setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

   
  // Fetch the user data from server

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(`${url}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        const userData = response.data.user || response.data
        setUser(userData);

      
      } catch (error) {
        console.log('error form fetch user :', error);
      }
    }
    if(!user){
      fetchUser();
    }
  }, [user])

// close the toogle menu click on outside
 useEffect(()=>{
    const handleOutsideClick = (e)=>{
       if(menuRef.current && !menuRef.current.contains(e.target)){
        setMenuOpen(false);
       }

    };
    document.addEventListener('mousedown',handleOutsideClick);
    return ()=>{
      document.removeEventListener('mousedown',handleOutsideClick);
    }
 },[]);





  const toogleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className='flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto'>
        <div onClick={() => {
          navigate('/')
        }} className='flex items-center gap-0 cursor-pointer'>
          <div className='w-15 h-15 rounded-xl overflow-hidden'>
            <img src={img1} alt="logo" />
          </div>
          <span className='lg:text-3xl md:text-3xl text-2xl text-gray-900 font-[550] lobster-regular' >
            Expanse Tracker
          </span>
        </div>
        {/* if the user is present */}
        {user && (
          <div className='relative' ref={menuRef}>
            <button onClick={toogleMenu} className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='relative '>
                <div className='w-9 h-9 flex items-center justify-center  rounded-full bg-linear-to-br from-teal-600 to-cyan-500 text-white font-bold text-lg'>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                {/* green dot */}
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 sborder-white'>
                </div>

              </div>
              <div className='text-left  hidden md:block'>
                <p className='text-sm font-medium text-gray-800 truncate max-w-30'>
                  {user?.name || 'User'}
                </p>
                <p className='text-xs text-gray-500 truncate max-w-30'>
                  {user?.email || 'user@gmail.com'}
                </p>
              </div>
              <ChevronDown className={`${menuOpen ? "rotate-180" : ""} cursor-pointer transition-all duration-300 `} />
            </button>
            {/* dropdown Menu */}
            {
              menuOpen && (
                <div className='absolute top-14 right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50'>
                  <div className='px-4 py-3 border-b border-gray-100'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-linear-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg'>
                        {user?.name?.[0]?.toUpperCase() || 'U'}

                      </div>
                      <div className='text-sm text-gray-800 '>
                        {user?.name || 'User'}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {user?.email || 'user@gmail.com'}
                      </div>

                    </div>
                    <div className='p-1.5'>
                      <button onClick={() => {
                        setMenuOpen(false);
                        Navigate('/profile')
                      }} className='w-full px-4 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 rounded-lg'>

                        <User className='w-4 h-4  ' />
                        <span className='cursor-pointer'>
                          My profile
                        </span>


                      </button>
                    </div>
                    <div className='p-1.5 border-t border-gray-100'>
                      <button onClick={logOut} className='flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 text-red-600 rounded-lg'>
                        <LogOut className='w-4 h-4  ' />
                        <span className='cursor-pointer'>
                          Log Out
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              )
            }
          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar