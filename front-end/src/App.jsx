
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import FooterS from './components/FooterS'


function App() {

  return (
    <>
      <Navbar />
      <div className=' bg-purple-100 min-h-screen'>
        <Outlet />
      </div>
      <FooterS />

    </>
  )
}

export default App
