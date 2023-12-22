import { useRecoilState } from 'recoil';
import style from './list.module.css';
import { useEffect, useState } from 'react';
import { listModal, mainModal, shopTabHandler } from '../../../../recoil/lobby';
import { closeHandler, modalHandler } from '../../../../api/modal';

function ShopList() {
  const [list, setList] = useRecoilState(listModal);
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);
  const [tab, setTab] = useRecoilState(shopTabHandler);

  useEffect(() => {
    modalHandler(style, list.shop, setVisible, setFade);
  }, [list.shop]);

  const closeModal = () => {
    setMain({ ...main, show: 0 });
    closeHandler(style, list, 'best', setList, setFade);
  };

  const tabHandler = (idx: number) => {
    setTab(idx);
  };

  return (
    <div className={`${style.list_box} ${visible} ${fade}`}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={`${style.shop_option} ${tab === 0 ? style.selected : ''}`} onClick={() => tabHandler(0)}>
              캐릭터
            </div>
            {/* <div className={`${style.shop_option} ${tab === 1 ? style.selected : ''}`} onClick={() => tabHandler(1)}>
              포인트
            </div> */}
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
            onClick={closeModal}
          />
        </div>
        {[<CharacterShop />][tab]}
      </div>
    </div>
  );
}

function CharacterShop() {
  let discount = 1;

  return (
    <div className={style.shop_list}>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
      <div className={style.shop_item}>
        <div className={style.shop_img}>
          <img alt="profile_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} className={style.product} />
          <div className={style.discount}>
            <img
              alt="profile_img"
              src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
              className={style.discount_icon}
            />
            <p className={style.discount_text}>10%</p>
          </div>
        </div>
        <div className={style.shop_price}>
          <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} className={style.cash_icon} />
          <div className={style.price_box}>
            <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>99999</p>
            {discount > 0 ? <p className={style.calc_price}>99999</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// function PointShop() {
//   let discount: number = 1;

//   return (
//     <div className={style.shop_list}>
//       <div className={style.shop_item}>
//         <div className={style.shop_img}>
//           <div className={style.cash}>
//             <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
//             <p>x10</p>
//           </div>
//           {discount > 0 ? (
//             <div className={style.discount}>
//               <img
//                 alt="profile_img"
//                 src={process.env.REACT_APP_BUCKET_URL + 'icons/discount_icon.svg'}
//                 className={style.discount_icon}
//               />
//               <p className={style.discount_text}>{discount}%</p>
//             </div>
//           ) : null}
//         </div>
//         <div className={style.shop_price}>
//           <img
//             alt="cash"
//             src={process.env.REACT_APP_BUCKET_URL + 'icons/money_icon.svg'}
//             className={style.money_icon}
//           />
//           <div className={style.price_box}>
//             <p className={`${style.price_text} ${discount > 0 ? style.discount_price : ''}`}>10000</p>
//             {discount > 0 ? <p className={style.calc_price}>9000</p> : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default ShopList;
