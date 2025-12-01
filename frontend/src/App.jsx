import './App.css'
import { Landing, Dashboard, Auth } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='' element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
