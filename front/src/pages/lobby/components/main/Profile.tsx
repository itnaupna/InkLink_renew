import { useRecoilState, useRecoilValue } from 'recoil';
import style from './main.module.css';
import { mainModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import { closeHandler, modalHandler } from '../../../../api/modal';
import { userDataAtom } from '../../../../recoil/user';

function Profile() {
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);
  const userData = useRecoilValue(userDataAtom);

  useEffect(() => {
    modalHandler(style, main.profile, setVisible, setFade);
  }, [main.profile]);

  return (
    <div className={`${style.sm_box} ${style.mr_1} ${visible} ${fade}`}>
      <div className={style.close_btn}>
        <img
          alt="close-btn"
          src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'}
          onClick={() => closeHandler(style, main, 'profile', setMain, setFade)}
        />
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
              <span>{userData.nick}</span>
            </p>
            <p className={style.profile_info_nickname}>
              {/* <span style={{ fontSize: '2rem' }} className={style.mr_half}>
                ❤️
              </span> */}
              <span>점수 : {userData.total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
