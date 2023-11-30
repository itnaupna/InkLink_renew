import { useRecoilState } from 'recoil';
import style from './menu.module.css';
import { listModal } from '../../../../recoil/lobby';

function Desktop() {
  const [list, setList] = useRecoilState(listModal);
  const mainModalHandler = (type: string) => {
    let listData = { room: false, best: false, shop: false };

    switch (type) {
      case 'room':
        listData.room = !list.room;
        setList(listData);
        break;

      case 'best':
        listData.best = !list.best;
        setList(listData);
        break;

      case 'shop':
        listData.shop = !list.shop;
        setList(listData);
        break;
    }
  };

  return (
    <>
      <div className={style.menu_options}>
        <div
          onClick={() => {
            mainModalHandler('room');
          }}
        >
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </div>
        <div
          onClick={() => {
            mainModalHandler('best');
          }}
        >
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </div>
        <div
          onClick={() => {
            mainModalHandler('shop');
          }}
        >
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
