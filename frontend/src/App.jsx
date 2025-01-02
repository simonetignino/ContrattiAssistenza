
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import CreateContract from './pages/CreateContractHw'
import SingleContractHw from "./pages/SingleContractHw"
import CreateInterventionsHw from "./pages/CreateInterventionsHw"
import NavigationButtons from "./components/Buttons/NavigationButtons"

function App() {

  return (
    <Router>
      <main className='container mx-auto max-w-full'>
        <NavigationButtons />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateContract/>} />
          <Route path="/contracts-hw/:id/interventions" element={<SingleContractHw/>} />
          <Route path="/contracts-hw/:id/interventions/create" element={<CreateInterventionsHw/>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
