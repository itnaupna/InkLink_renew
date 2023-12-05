import { useEffect, useState } from 'react';
import style from './menu.module.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { listMenu, mainMenu } from '../../../../api/menu';
import { detailModal, listModal, mainModal, mobileModal, shopTabHandler } from '../../../../recoil/lobby';

function Mobile() {
  const [menu, setMenu] = useRecoilState(mobileModal);
  const [main, setMain] = useRecoilState(mainModal);
  const [detail, setDetail] = useRecoilState(detailModal);
  const setList = useSetRecoilState(listModal);
  const setTab = useSetRecoilState(shopTabHandler);
  const [visible, setVisible] = useState<string>('');

  useEffect(() => {
    if (menu) {
      setVisible(style.mobile_fade_in);
    } else {
      setVisible('');
    }
  }, [menu]);

  const mobileMenuHandler = () => {
    setMenu(!menu);
  };

  const listMenuHandler = (type: string) => {
    setMain({ ...main, show: 1 });
    let listData = { room: false, best: false, shop: false };
    listMenu(type, listData, setList);
    setMenu(false);
    setVisible('');
  };

  const mainMenuHandler = (type: string) => {
    mainMenu(type, main, setMain);
    setMenu(false);
    setVisible('');
  };

  const signOutHandler = () => {
    setDetail({ ...detail, signOut: true });
    setMenu(false);
    setVisible('');
  };

  return (
    <>
      <div className={style.mobile_menu_btn} onClick={mobileMenuHandler}>
        <img alt="menu_btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/menu_modal_icon.svg'} />
      </div>
      <ul className={`${style.mobile_menu_modal} ${visible}`}>
        <li className={style.mobile_menu_options} onClick={() => listMenuHandler('room')}>
          <img alt="room-list" src={process.env.REACT_APP_BUCKET_URL + 'icons/room_list_icon.svg'} />
          <span>방목록</span>
        </li>
        <li className={style.mobile_menu_options} onClick={() => listMenuHandler('best')}>
          <img alt="best-drawing" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon.svg'} />
          <span>오늘의 그림</span>
        </li>
        <li
          className={style.mobile_menu_options}
          onClick={() => {
            listMenuHandler('shop');
            setTab(0);
          }}
        >
          <img alt="shop" src={process.env.REACT_APP_BUCKET_URL + 'icons/shop_icon2.svg'} />
          <span>상점</span>
        </li>
        <li className={style.mobile_menu_options} onClick={() => mainMenuHandler('profile')}>
          <img alt="profile" src={process.env.REACT_APP_BUCKET_URL + 'icons/profile_icon.svg'} />
          <span>프로필</span>
        </li>
        <li className={style.mobile_menu_options} onClick={() => mainMenuHandler('chat')}>
          <img alt="chat" src={process.env.REACT_APP_BUCKET_URL + 'icons/chat_icon.svg'} />
          <span>채팅</span>
        </li>
        <li className={style.mobile_menu_options} onClick={() => mainMenuHandler('member')}>
          <img alt="member" src={process.env.REACT_APP_BUCKET_URL + 'icons/member_list_icon.svg'} />
          <span>사용자 목록</span>
        </li>
        <li className={style.mobile_menu_account}>
          <div className={style.mobile_signout} onClick={signOutHandler}>
            <img alt="sign-out" src={process.env.REACT_APP_BUCKET_URL + 'icons/sign_out_icon.svg'} />
            <span>로그아웃</span>
          </div>
          <div className={style.cash_point_box_mobile}>
            <div className={style.cash_point_text}>
              <img alt="cash" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_icon.svg'} />
              <span>99999</span>
            </div>
            <div
              className={style.cash_point_btn}
              onClick={() => {
                listMenuHandler('shop');
                setTab(1);
              }}
            >
              <img alt="cash-add" src={process.env.REACT_APP_BUCKET_URL + 'icons/cash_add_btn.svg'} />
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Mobile;
