import { Notice, Profile } from '../index';
import style from './main.module.css';

function LobbyMain() {
  return (
    <div>
      <div className={style.lobby_top}>
        <Profile />
        <Notice />
      </div>
      <div className={style.lobby_bottom}>
        <div className={`${style.lg_box} ${style.mr_1}`}>
          <div className={style.close_btn}>
            <img alt="close-btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'} />
          </div>
          <div className={style.detail_box}>
            <div className={style.detail}>123</div>
          </div>
        </div>
        <div className={`${style.sm_box} ${style.ml_1}`}>
          <div className={style.close_btn}>
            <img alt="close-btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'} />
          </div>
          <div className={style.detail_box}>
            <div className={style.detail}>123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyMain;
