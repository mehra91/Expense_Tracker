import React, { useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/storeContext'
import { useContext } from 'react'
import { motion, scale } from 'framer-motion'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ArrowDown, ArrowUp, Home, User } from 'lucide-react'

const MENU_ITEMS = [
  { text: 'Dashboard', path: '/', icon: <Home size={20} /> },
  { text: 'Income', path: '/income', icon: <ArrowUp size={20} /> },
  { text: 'Expenses', path: '/expense', icon: <ArrowDown size={20} /> },
  { text: 'Profile', path: '/profile', icon: <User size={20} /> }
]

const Sidebar = ({ isCollapse, setIsCollapse }) => {
  const { user, logOut } = useContext(StoreContext);
  const { pathName } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);


  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  const {
    name: username = 'User',//get user name and reanme into username
    email = 'pm@gmail.com'
  } = user || {};
  const initial = username.charAt(0).toUpperCase();

  // to check for mobile overflow
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : 'auto';
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileOpen]);

  //click outside sidebar get collapsed
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileOpen
        && sidebarRef.current
        && sidebarRef.current.contains(e.target)
      ) {
        setMobileOpen(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  const toogleSidebar = () => setIsCollapse((c) => !c);

  //a  small component 

  const renderMenuItem = ({ text, path, icon }) => {
    const isActive = pathname === path;
    return (
      <motion.li key={text} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          to={path}
          className={cn(
            sidebarStyles.menuItem.base,
            isActive ? sidebarStyles.menuItem.active : sidebarStyles.menuItem.inactive,
            isCollapsed ? sidebarStyles.menuItem.collapsed : sidebarStyles.menuItem.expanded
          )}
          onMouseEnter={() => setActiveHover(text)}
          onMouseLeave={() => setActiveHover(null)}
        >
          <span className={isActive ? sidebarStyles.menuIcon.active : sidebarStyles.menuIcon.inactive}>
            {icon}
          </span>
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              {text}
            </motion.span>
          )}
          {activeHover === text && !isActive && !isCollapsed && (
            <span className={sidebarStyles.activeIndicator}></span>
          )}
        </Link>
      </motion.li>
    );
  };



  return (
    <>
      <motion.div ref={sidebarRef}
        className='hidden lg:flex flex-col pt-3 fixed top-16 bottom-0 z-30'
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isCollapse ? 80 : 256
        }} transition={{ type: 'spring', damping: '25' }}
      >
        <div className='bg-white border-r  border-gray-200 shadow-md h-full flex flex-col'>
          <button onClick={toogleSidebar}
            className='absolute -right-3 top-12 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all'>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isCollapse ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points={isCollapse ? "9 18 15 12 9 6" : "15 18 9 12 15 6"}></polyline>
              </svg>
            </motion.div>
          </button>
        </div>


      </motion.div>

    </>
  )
}

export default Sidebar