import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Fixtures from './pages/Fixtures'
import Results from './pages/Results'
import Fanzone from './pages/Fanzone'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/results" element={<Results />} />
            <Route path="/fanzone" element={<Fanzone />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App