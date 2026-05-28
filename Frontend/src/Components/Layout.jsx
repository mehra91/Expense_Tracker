import React, { useState } from 'react'
import {styles} from '../assets/dummyStyles'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  const[sidebarCollapse,setSidebarCollapse] = useState(false);
  return (
    <div className='styles.layout.roots'>
      <Navbar/>
      <Sidebar isCollapse={sidebarCollapse}setIsCollapse={setSidebarCollapse}/>
    </div>
  )
}

export default Layout