import { useRecoilState } from 'recoil';
import style from './list.module.css';
import { useEffect, useState } from 'react';
import { listModal } from '../../../../recoil/lobby';
import { closeHandler, modalHandler } from './api/modal';

function ShopList() {
  const [list, setList] = useRecoilState(listModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);

  useEffect(() => {
    modalHandler(list.shop, setVisible, setFade);
  }, [list.shop]);
  return (
    <div className={`${style.list_box} ${visible} ${fade}`}>
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
            onClick={() => closeHandler(list, 'shop', setList, setFade)}
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
