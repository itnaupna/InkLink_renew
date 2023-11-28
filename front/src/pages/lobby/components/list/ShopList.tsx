import style from './list.module.css';

function ShopList() {
  return (
    <div className={style.list_box}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={style.shop_option}>캐릭터</div>
            <div className={style.shop_option}>몰?루</div>
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
          />
        </div>
        <div className={style.shop_list}>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
          <div className={style.shop_item}>
            <div className={style.shop_img}>
              <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
            </div>
            <div className={style.shop_price}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <p>99999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopList;
