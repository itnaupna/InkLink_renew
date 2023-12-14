import { useRecoilState } from 'recoil';
import { detailModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import style from './detail.module.css';

function SignOut() {
  const [detail, setdetail] = useRecoilState(detailModal);
  const [visible, setVisible] = useState<string>('');
  const [hide, setHide] = useState<string>('d_hide');

  useEffect(() => {
    if (detail.signOut) {
      setVisible('fade_in');
      setHide('');
    }
  }, [detail.signOut]);

  const signOutHandler = () => {
    setdetail({ ...detail, signOut: false });
    setVisible('');
    setHide('d_hide');
  };

  return (
    <div className={`detail_modal_bg ${visible}`} onClick={signOutHandler}>
      <div className="detail_modal_box">
        <div className={`detail_modal ${hide}`} onClick={(e) => e.stopPropagation()}>
          <p className={style.title}>Q. 정말 로그아웃 하시겠습니까?</p>
          <div className={style.btn_box}>
            <div className={style.sign_out_btn} onClick={signOutHandler}>
              취소
            </div>
            <div className={`${style.sign_out_btn} ${style.btn_main}`}>확인</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
