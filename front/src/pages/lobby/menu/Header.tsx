import style from './menu.module.css';

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
      <div className={style.menu_options}>
        <div>
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </div>
        <div>
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </div>
        <div>
          <img alt="shop" src={process.env.REACT_APP_BUCKET_URL + 'icons/shop_icon.svg'} />
          <span>상점</span>
        </div>
      </div>
      <div className={style.cash_point_box}>
        <div className={style.cash_point_text}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
          <span>99999</span>
        </div>
        <div className={style.cash_point_btn}>
          <img alt="cash-add" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_add_btn.svg'} />
        </div>
      </div>
    </div>
  );
}

export default Header;
