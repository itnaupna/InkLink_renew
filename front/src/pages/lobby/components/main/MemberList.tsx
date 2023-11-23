import style from './main.module.css';

function MemberList() {
  return (
    <div className={`${style.sm_box} ${style.ml_1}`}>
      <div className={style.close_btn}>
        <img alt="close-btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'} />
      </div>
      <div className={style.detail_box_bottom}>
        <div className={style.detail}>
          <div className={style.member_window}>
            <div className={style.member_nickname_col}>닉네임</div>
            <div className={style.member_score}>점수</div>
            <div className={style.member_location}>위치</div>
          </div>
          <div className={style.member_detail}>
            <div className={style.member_list}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={`${style.member_list} ${style.bg_gray}`}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={style.member_list}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={`${style.member_list} ${style.bg_gray}`}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={style.member_list}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={`${style.member_list} ${style.bg_gray}`}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={style.member_list}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={`${style.member_list} ${style.bg_gray}`}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={style.member_list}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
            <div className={`${style.member_list} ${style.bg_gray}`}>
              <div className={style.member_nickname}>일이삼사오육칠팔구십일이</div>
              <div className={style.member_score}>99999</div>
              <div className={style.member_location}>999번방</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberList;
