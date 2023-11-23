import style from './main.module.css';

function Profile() {
  return (
    <div className={`${style.sm_box} ${style.mr_1}`}>
      <div className={style.close_btn}>
        <img alt="close-btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'} />
      </div>
      <div className={style.detail_box_top}>
        <div className={style.detail}>
          <div className={style.profile_icon}>
            <div className={style.profile_icon_btn}>
              <img alt="left-arrow" src={process.env.REACT_APP_BUCKET_URL + 'icons/left_arrow.svg'} />
            </div>
            <div className={style.profile_icon_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.profile_icon_btn}>
              <img alt="right-arrow" src={process.env.REACT_APP_BUCKET_URL + 'icons/right_arrow.svg'} />
            </div>
          </div>
          <div className={style.profile_info}>
            <p className={style.profile_info_nickname}>
              <img
                className={style.mr_half}
                alt="edit-btn"
                src={process.env.REACT_APP_BUCKET_URL + 'icons/edit_icon.svg'}
              ></img>
              <span>일이삼사오육칠팔구십일이</span>
            </p>
            <p className={style.profile_info_nickname}>
              <span style={{ fontSize: '2rem' }} className={style.mr_half}>
                ❤️
              </span>
              <span>99999</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
