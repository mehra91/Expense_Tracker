import React, { useRef, useState } from 'react'
import { StoreContext } from '../context/storeContext'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = ({ isCollapse, setIsCollapse }) => {
  const { user } = useContext(StoreContext);
  const { pathName } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  const {
    name:username = 'User',//get user name and reanme into username
    email = 'pm@gmail.com'
  } = user || {};
  const initial = username.cahrAt(0).toUpperCase();


  return (
    <>
      <motion.div>


      </motion.div>

    </>
  )
}

export default Sidebar