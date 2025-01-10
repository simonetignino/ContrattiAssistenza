
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import CreateContract from './pages/CreateContractHw'
import SingleContractHw from "./pages/SingleContractHw"
import CreateInterventionsHw from "./pages/CreateInterventionsHw"
import SingleIntervention from "./pages/SingleInervention"
import Navbar from "./components/Navbar"

function App() {

  return (
    <Router>
      <main className='container mx-auto max-w-full'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateContract/>} />
          <Route path="/contracts-hw/:id/interventions" element={<SingleContractHw/>} />
          <Route path="/contracts-hw/:id/interventions/create" element={<CreateInterventionsHw/>} />
          <Route path="/contracts-hw/:id/interventions/:interventionId" element={<SingleIntervention />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
