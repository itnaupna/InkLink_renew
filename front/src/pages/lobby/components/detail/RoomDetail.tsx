import { useEffect, useState } from 'react';
import style from './detail.module.css';
import { useRecoilState } from 'recoil';
import { detailModal } from '../../../../recoil/lobby';

function RoomDetail() {
  const [detail, setdetail] = useRecoilState(detailModal);
  // const room = useRecoilValue(roomDetail);
  const [visible, setVisible] = useState<string>('');
  const [hide, setHide] = useState<string>('d_hide');

  useEffect(() => {
    if (detail.room) {
      setVisible('fade_in');
      setHide('');
    }
  }, [detail.room]);

  const closeRoomCreator = () => {
    setdetail({ ...detail, user: false });
    setVisible('');
    setHide('d_hide');
  };

  return (
    <div className={`detail_modal_bg ${visible}`} onClick={closeRoomCreator}>
      <div className="detail_modal_box">
        <div className={`detail_modal ${hide}`} onClick={(e) => e.stopPropagation()}>
          <p className={style.title}>[123]</p>
          <div className={style.btn_box}>
            <div className={style.sign_out_btn} onClick={closeRoomCreator}>
              취소
            </div>
            <div className={`${style.sign_out_btn} ${style.btn_main}`}>확인</div>
          </div>
        </div>
      </div>
    </div>
  );
}
