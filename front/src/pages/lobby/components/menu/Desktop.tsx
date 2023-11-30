import { useSetRecoilState } from 'recoil';
import style from './menu.module.css';
import { listModal } from '../../../../recoil/lobby';

function Desktop() {
  const setList = useSetRecoilState(listModal);
  const listModalHandler = (type: string) => {
    let listData = { room: false, best: false, shop: false };

    switch (type) {
      case 'room':
        listData.room = true;
        setList(listData);
        break;

      case 'best':
        listData.best = true;
        setList(listData);
        break;

      case 'shop':
        listData.shop = true;
        setList(listData);
        break;
    }
  };

  return (
    <>
      <div className={style.menu_options}>
        <div onClick={() => listModalHandler('room')}>
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </div>
        <div onClick={() => listModalHandler('best')}>
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </div>
        <div onClick={() => listModalHandler('shop')}>
          <img alt="shop" src={process.env.REACT_APP_BUCKET_URL + 'icons/shop_icon3.svg'} />
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
    </>
  );
}

export default Desktop;
