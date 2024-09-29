import  './App.scss'
import Home from './components/pages/Home/Home'
import { useState } from 'react'

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className='app'
    style={{
      height: loginOpen ? '100svh' : '100vh'
    }}
    >
      <Home
      setLoginOpen={setLoginOpen}
      loginOpen={loginOpen} />      
    </div>
  )
}

export default App
