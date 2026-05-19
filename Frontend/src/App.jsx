 import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Dashboard from './Pages/Dashboard'
 
 const App = () => {
   return (
   <>
   <Routes>
    <Route element={<Layout/>} >
      <Route path='/' element={<Dashboard/>}/>
    </Route>
   </Routes>
   </>
   )
 }
 
 export default App