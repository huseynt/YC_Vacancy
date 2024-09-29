import style from './sidebar.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface ISidebar {
  sidebarVisibility: boolean;
  loginOpen: boolean;
  setLoginOpen: (value: boolean) => void;
  setSidebarVisibility: (value: boolean) => void;
}

const Sidebar: React.FC<ISidebar> = (props) => {
  const { sidebarVisibility, loginOpen, setLoginOpen, setSidebarVisibility} = props;
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [accountkey, setAccountKey] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }


  const submit = () => {
    if (loginOpen) {
      console.log(loginData);
      setLoginOpen(false);
      setSidebarVisibility(!sidebarVisibility);
      check_account();
    }
    else {
      setLoginOpen(true);
    }
  }

  // ---------------- account login ----------------
  const api = {
    baseURL: import.meta.env.VITE_API_URL_YC as string,
    config: {
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY as string
      }
    }
  };

  useEffect(() => {
    if (accountkey) {
      console.log(accountkey);
    }
  }, [accountkey]);

  const check_account = async () => {
    try {
      axios.get(`${api.baseURL}/y-c-account/_watch?login=${loginData.email}&pass=${loginData.password}`, api.config)
    } catch (error) {
      console.error(error);
    } finally {
      setAccountKey(loginData.email);
      localStorage.setItem('accountkey', loginData.email);
    }
  }


  return (
    <div className={`
      ${style.sidebar}
      ${sidebarVisibility ? style.sidebar_open : style.sidebar_close}`}
      id='sidebar'
      style={{
        height: loginOpen ? '100svh' : ''
      }}
      >
      
      <div className={`${style.sidebar_out} ${loginOpen ? style.login_open : style.login_close}`}>
        <div className={style.sidebar_out_block}>
          <div className={style.sidebar_out_block_up}>
            <div className={style.sidebar_out_block_up_head}>Sizin<br/>Karyera</div>

            <div className={style.sidebar_out_block_up_form}
            style={{
              display: loginOpen ? '' : 'none'
            }}
            >
              <div className={style.sidebar_out_block_up_form_head}>Kabinet</div>
              <div className={style.sidebar_out_block_up_form_login}>
                <input className={style.sidebar_out_block_up_form_login_input} 
                onChange={handleChange}
                type="text" 
                name='email'
                placeholder='Mail'/>
              </div>
              <div className={style.sidebar_out_block_up_form_password}>
                <input className={style.sidebar_out_block_up_form_password_input} 
                onChange={handleChange}
                type="password" 
                name='password'
                placeholder='Parol'/>
              </div>
            </div>

            <div className={style.sidebar_out_block_up_account}
            style={{
              marginTop: loginOpen ? '' : '20px'
            }}
            >
              <div className={style.sidebar_out_block_up_account_btn}
              onClick={submit}
              style={{
                backgroundColor: loginOpen ? '#000' : '',
                color: loginOpen ? '#fff' : ''
              }}
              >Daxil ol</div>
              <div className={style.sidebar_out_block_up_account_btn}>Ayarlar</div>
            </div>

          </div>

          <div className={style.sidebar_out_block_theme}>
            <div className={style.sidebar_out_block_theme_option}>Theme</div>
            {/* <div className={style.sidebar_out_block_theme_option}>Dark</div> */}
          </div>
      </div>
      
      </div>
    </div>
  )
}

export default Sidebar
