import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const initialForm = {
    gadgetName: '',
    category: '',
    manufacturer: '',
    healthRating: '',
    techBrandName: '',
    userRole: '',
  }

  return (
    <>
      <h1 className='text-4xl font-bold'>
        Tech Gadget and Inventory Hub
      </h1>
    </>
  )
}

export default App
