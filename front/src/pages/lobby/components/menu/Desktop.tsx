import { useRecoilState, useSetRecoilState } from 'recoil';
import style from './menu.module.css';
import { listModal, mainModal, shopTabHandler } from '../../../../recoil/lobby';
import { listMenu } from '../../../../api/menu';

function Desktop() {
  const setList = useSetRecoilState(listModal);
  const [main, setMain] = useRecoilState(mainModal);
  const setTab = useSetRecoilState(shopTabHandler);

  const listMenuHandler = (type: string) => {
    setMain({ ...main, show: 1 });
    let listData = { room: false, best: false, shop: false };
    listMenu(type, listData, setList);
  };

  return (
    <>
      <div className={style.menu_options}>
        <div onClick={() => listMenuHandler('room')}>
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </div>
        <div onClick={() => listMenuHandler('best')}>
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </div>
        <div
          onClick={() => {
            listMenuHandler('shop');
            setTab(0);
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
        {/* <div
          className={style.cash_point_btn}
          onClick={() => {
            listMenuHandler('shop');
            setTab(1);
          }}
        >
          <img alt="cash-add" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_add_btn.svg'} />
        </div> */}
      </div>
    </>
  );
}

export default Desktop;
