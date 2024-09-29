import style from './luck.module.scss'
// import { useState } from 'react'

interface ILuck {
    index: number;
}

const Luck:React.FC<ILuck> = (props) => {
    const { index } = props;
    // const [hide, setHide] = useState(false);
    // // ----------------- Luck Message -----------------
    // const handleMessage = () => {
    //     if (index + 1 === 10) {
    //     const timer = setTimeout(() => {
    //         setHide(true);
    //     }, 3000);
    //     return () => clearTimeout(timer);
    //     }
    // }
    // ----------------- Luck Message -----------------

    return (
    <div className={style.luck}
    
    >
        <div className={style.luck_message}>{index} Sənə uyğun işə biraz daha yaxınlaşdın 🎉</div>
    </div>
    )
}

export default Luck
