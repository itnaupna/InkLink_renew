import style from './menu.module.css';
import { Desktop, Mobile } from '../../index';

function Header() {
  
  return (
    <div className={style.header_bar}>
      <div className={style.profile_box}>
        <div className={style.profile_img}>
          <img alt="" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
        </div>
        <div className={style.profile_text}>
          <p>일이삼사오육칠팔구십일이</p>
          <p>점수:99999</p>
        </div>
      </div>
      <Desktop />
      <Mobile />
    </div>
  );
}

export default Header;
