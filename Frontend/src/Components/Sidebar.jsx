import React, { useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/storeContext'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = ({ isCollapse, setIsCollapse }) => {
  const { user,logOut } = useContext(StoreContext);
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


  return (
    <>
      <motion.div>


      </motion.div>

    </>
  )
}

export default Sidebar