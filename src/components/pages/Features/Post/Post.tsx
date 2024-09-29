import style from './post.module.scss'
import logo from '../../../../../public/assets/CVsizin.png'
import { useState } from 'react'
import axios from 'axios';
// import Luck from '../Luck/Luck';
export const colors = [
  '#fde0cd',
  '#d7f6ee',
  '#e3dbfa',
  '#e1f3ff',
  '#f9e2f4',
  '#eceff4'
]

interface IJob {
    id: string;
    head: string;
    category: string;
    detail: string;
    email: string;
    like: number;
    index: number;
    date: string;
    company: string;
    view: number;
    setSidebarVisibility: (value: boolean) => void;
    sidebarVisibility: boolean;
  }

const Post: React.FC<IJob> = (props) => {
  const { 
      id,
      head,
      category,
      detail,
      email,
      like,
      index,
      date,
      company,
      view,
      setSidebarVisibility,
      sidebarVisibility
  } = props;
  
  const [isEmailShown, setIsEmailShown] = useState(false);
  const [data, setData] = useState({
    id: id,
    head: head,
    category: category,
    detail: detail,
    email: email,
    like: like,
    date: date,
    company: company,
    view: view
  });

  const api = {
    baseURL: import.meta.env.VITE_API_URL as string,
    config: {
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY as string
      }
    }
  };

  // ----------------- Like -----------------
  const handleLike = async () => {
    if (data.like === like) {
      const updatedData = {
        ...data,
        like: data.like + 1
      };
  
      setData(updatedData);
  
      try {
        const response = await axios.put(
          `${api.baseURL}/${id}`, 
          { like: updatedData.like },
          api.config
        );
        console.log("Like updated:", response.data);
      } catch (error) {
        console.log("Error updating like:", error);
      }
    }
  };
  // ----------------- Like -----------------

  // ----------------- View email -----------------
  const handleViewEmail = async () => {
    const updatedData = {
      ...data,
      view: data.view + 1
    };
    setData(updatedData);

    try {
      const response = await axios.put(
        `${api.baseURL}/${id}`,
        { view: updatedData.view },
        api.config
      );
      console.log("Email updated:", response.data);
    } catch (error) {
      console.log("Error updating email:", error);
    }
  };
  // ----------------- View email -----------------

  return (
    <div className={style.post}>
      <div className={style.post_content}>
        <div className={style.post_content_main}>
          <div className={style.post_content_main_card} style={{
            backgroundColor: colors[index % colors.length]
          }} >
            <div className={style.post_content_main_card_up}>
              <div className={style.post_content_main_card_up_date}>
                {date}
              </div>
              <div className={style.post_content_main_card_up_like}>
                <svg className={style.post_content_main_card_up_like_svg} onClick={() => setSidebarVisibility(!sidebarVisibility)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/>
                </svg>
              </div>
            </div>

            <div className={style.post_content_main_card_job}>
              <div className={style.post_content_main_card_job_company}>
                {company}
              </div> 

              <div className={style.post_content_main_card_job_down}>
                <div className={style.post_content_main_card_job_down_name}>
                  {head}
                </div>
                <div className={style.post_content_main_card_job_down_photo}>
                  <img src={logo} alt="logo" />
                </div>
              </div>
            </div>

            <div className={style.post_content_main_card_tags}>
              <div className={style.post_content_main_card_tags_item}>Part time</div>
              <div className={style.post_content_main_card_tags_item}>Senior level</div>
              <div className={style.post_content_main_card_tags_item}>Distant</div>
              <div className={style.post_content_main_card_tags_item}>Project work</div>
            </div>

            <div className={style.post_content_main_card_description}>
              <div className={style.post_content_main_card_description_text}>
                {detail}
              </div>
              <div style={{ display: 'none' }}>
                <p>{category}</p>
                <p>{email}</p>
                <p>{like}</p>
              </div>

              <div className={style.post_content_main_card_description_report}>
                <div className={style.post_content_main_card_description_report_up}>
                  <div className={style.post_content_main_card_description_report_up_view}>
                    <svg className={style.post_content_main_card_description_report_up_view_svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                      <path d="M638-80 468-250l56-56 114 114 226-226 56 56L638-80ZM480-520l320-200H160l320 200Zm0 80L160-640v400h206l80 80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v174l-80 80v-174L480-440Zm0 0Zm0-80Zm0 80Z"/>
                    </svg>
                    
                    <div className={style.post_content_main_card_description_report_up_view_txt}>{data.view}</div>
                  </div>
                  <div className={style.post_content_main_card_description_report_up_like}
                  onClick={handleLike}
                  style={{
                    backgroundColor: data.like === like + 1 ? '#ff4545' : '',
                    color: data.like === like + 1 ? '#fff' : ''
                  }}
                  >
                    <svg className={style.post_content_main_card_description_report_like_svg} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
                    fill={data.like === like + 1 ? "#fff" : "#000"}>
                      <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
                    </svg>

                    <div className={style.post_content_main_card_description_report_like_txt}>{data.like}</div>
                  </div>
                </div>

                <div className={style.post_content_main_card_description_report_down}>
                  <div className={style.post_content_main_card_description_report_down_slide}>
                    {index + 1}
                  </div>
                  <div className={style.post_content_main_card_description_report_down_id}
                    onClick={() => {
                      navigator.clipboard.writeText(id)
                    }}
                  >
                    id: {id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.post_content_main_request}>
            <div className={style.post_content_main_request_detail}>
              <div className={style.post_content_main_request_detail_salary}>$250/hr</div>
              <div className={style.post_content_main_request_detail_location}>San Francisco, CA</div>
            </div>
            <div className={style.post_content_main_request_mail}
              style={{
                fontSize: isEmailShown ? '0.95rem' : '',
                backgroundColor: isEmailShown ? '#386dff' : ''
              }}
              onClick={() => {
                if (!isEmailShown) {
                  setIsEmailShown(true)
                  handleViewEmail()
                } else {
                  window.open(`mailto: ${email}`)
                }
              }}
            >
              {isEmailShown ? email : 'Müraciət et'}
              {sidebarVisibility}
            </div>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default Post
