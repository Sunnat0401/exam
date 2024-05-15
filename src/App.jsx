import React from 'react'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'

const App = () => {
  return (
    <Routes>
  {/* <Route path='/' element={ <Home/>}/> */}
  <Route path='/' element={<HomePage/>}/>

    </Routes>

  )
}

export default App