import style from './home.module.scss'
import Slider from '../Features/Slider/Slider'
import Sidebar from '../Features/Sidebar/Sidebar';
import { useState } from 'react';

interface IHome {
   loginOpen: boolean;
    setLoginOpen: (value: boolean) => void; 
  }

const Home: React.FC<IHome>= (props) => {
  const { loginOpen, setLoginOpen } = props;
  const [sidebarVisibility, setSidebarVisibility] = useState(false);


  return (
    <div className={style.home}>

      <div className={style.home_main}
      style={{
        display: loginOpen ? 'none' : 'block'
      }}
      >
        <Slider sidebarVisibility={sidebarVisibility} 
        setSidebarVisibility={setSidebarVisibility}/>
      </div>


      <Sidebar sidebarVisibility={sidebarVisibility}
      loginOpen={loginOpen}
      setLoginOpen={setLoginOpen}
      setSidebarVisibility={setSidebarVisibility}
      />

      
    </div>
  )
}

export default Home
