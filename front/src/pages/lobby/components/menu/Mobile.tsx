import style from './menu.module.css';

function Mobile() {
  return (
    <div>
      <div className={style.mobile_menu_btn}>
        <img alt="menu_btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/menu_modal_icon.svg'} />
      </div>
      <ul className={style.mobile_menu_modal}>
        <li className={style.mobile_menu_options}>
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </li>
        <li className={style.mobile_menu_options}>
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </li>
        <li className={style.mobile_menu_options}>
          <img alt="shop" src={process.env.REACT_APP_BUCKET_URL + 'icons/shop_icon2.svg'} />
          <span>상점</span>
        </li>
        <li className={style.mobile_menu_options}>
          <img alt="profile" src={process.env.REACT_APP_BUCKET_URL + 'icons/profile_icon.svg'} />
          <span>프로필</span>
        </li>
        <li className={style.mobile_menu_options}>
          <img alt="chat" src={process.env.REACT_APP_BUCKET_URL + 'icons/chat_icon.svg'} />
          <span>채팅</span>
        </li>
        <li className={style.mobile_menu_options}>
          <img alt="member" src={process.env.REACT_APP_BUCKET_URL + 'icons/member_list_icon.svg'} />
          <span>사용자 목록</span>
        </li>
        <li className={style.mobile_menu_account}>
          <div className={style.mobile_signout}>
            <img  alt="sign-out" src={process.env.REACT_APP_BUCKET_URL + 'icons/sign_out_icon.svg'} />
            <span>로그아웃</span>
          </div>
          <div className={style.cash_point_box_mobile}>
            <div className={style.cash_point_text}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <span>99999</span>
            </div>
            <div className={style.cash_point_btn}>
              <img alt="cash-add" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_add_btn.svg'} />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Mobile;
