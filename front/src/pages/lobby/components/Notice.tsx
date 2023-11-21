import style from './main.module.css';

function Notice() {
  return (
    <div className={`${style.lg_box} ${style.ml_1}`}>
      <div className={style.close_btn} />
      <div className={style.detail_box}>
        <div className={style.notice_window}>
          <div className={style.notice_icon}>
            <img alt="notice-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/notice_icon.svg'} />
            <span>공지사항</span>
          </div>
          <div className={style.notice_preview}>
            <div>
              <img alt="new-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/new_icon.svg'} />
              <span className={style.notice_prev_text}>[임시점검]</span>
              <span className={style.notice_prev_text}>일이삼사오육칠팔구십일이삼사오육...</span>
            </div>
            <span className={style.notice_date}>2023.11.21</span>
          </div>
          <img
            className={style.notice_drop_down}
            alt="drop-down"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/drop_down_icon.svg'}
          />
        </div>
        <div className={style.notice_detail}>123</div>
      </div>
    </div>
  );
}

export default Notice;
