import style from './main.module.css';

function Notice() {
  return (
    <div className={`${style.lg_box} ${style.ml_1}`}>
      <div className={style.close_btn} />
      <div className={style.detail_box_top}>
        <div className={style.notice_window}>
          <div className={style.notice_grp}>
            <div className={style.notice_icon}>
              <img alt="notice-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/notice_icon.svg'} />
              <span>공지사항</span>
            </div>
            <div className={style.notice_preview}>
              <div>
                <img alt="new-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/new_icon.svg'} />
                <span className={style.notice_prev_type}>[임시점검]</span>
                <span className={style.notice_prev_title}>일이삼사오육칠팔구십일이삼사오육...</span>
              </div>
              <span className={style.notice_date}>2023.11.21</span>
            </div>
          </div>
          <img
            className={style.notice_drop_down}
            alt="drop-down"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/drop_down_icon.svg'}
          />
        </div>
        <div className={style.notice_detail}>
          <div className={style.notice_list}>
            <div className={style.notice_type}>[공지사항]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={`${style.notice_list} ${style.bg_gray}`}>
            <div className={style.notice_type}>[이벤트]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={style.notice_list}>
            <div className={style.notice_type}>[공지사항]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={`${style.notice_list} ${style.bg_gray}`}>
            <div className={style.notice_type}>[이벤트]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={style.notice_list}>
            <div className={style.notice_type}>[공지사항]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={`${style.notice_list} ${style.bg_gray}`}>
            <div className={style.notice_type}>[이벤트]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={style.notice_list}>
            <div className={style.notice_type}>[공지사항]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
          <div className={`${style.notice_list} ${style.bg_gray}`}>
            <div className={style.notice_type}>[이벤트]</div>
            <div className={style.notice_title}>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className={style.notice_date}>9999.99.99</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;
