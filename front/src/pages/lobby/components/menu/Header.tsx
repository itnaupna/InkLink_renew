import style from './menu.module.css';
import { Desktop, Mobile } from '../../index';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../../../recoil/user';

function Header() {
  const userData = useRecoilValue(userDataAtom);

  return (
    <div className={style.header_bar}>
      <div className={style.profile_box}>
        <div className={style.profile_img}>
          <img alt="" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
        </div>
        <div className={style.profile_text}>
          <p>{userData.nick}</p>
          <p>점수 : {userData.total}</p>
        </div>
      </div>
      <Desktop />
      <Mobile />
    </div>
  );
}

export default Header;
