import { useState } from 'react'
import './App.css'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import video from '../src/assets/mov_bbb.mp4'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
<Hero
  videoSrc={video}
  heading="Welcome to IMG"
  tagline="// We power the world's passion for sport"
/>
    </>
  )
}

export default App
