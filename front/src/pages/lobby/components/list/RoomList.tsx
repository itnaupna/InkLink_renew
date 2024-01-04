import { useRecoilState, useRecoilValue } from 'recoil';
import style from './list.module.css';
import { detailModal, listModal, mainModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import { closeHandler, modalHandler } from '../../../../api/modal';
import { roomList } from '../../../../recoil/detail';
import { useNavigate } from 'react-router-dom';
import { socketAtom } from '../../../../recoil/socket';

function RoomList() {
  const [list, setList] = useRecoilState(listModal);
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);
  const [detail, setDetail] = useRecoilState(detailModal);
  const room = useRecoilValue(roomList);
  const socket = useRecoilValue(socketAtom);
  const navigate = useNavigate();

  useEffect(() => {
    modalHandler(style, list.room, setVisible, setFade);
  }, [list.room]);

  const closeModal = () => {
    setMain({ ...main, show: 0 });
    closeHandler(style, list, 'best', setList, setFade);
  };

  const createRoom = () => {
    setDetail({ ...detail, room: true });
  };

  const joinRoom = (id: string) => {
    socket.emit('joinRoom');
    navigate(`/room/${id}`);
  };

  return (
    <div className={`${style.list_box} ${visible} ${fade}`}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={style.room_btn} onClick={createRoom}>
              방생성
            </div>
            <div className={style.room_btn}>퀵매칭</div>
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
            onClick={closeModal}
          />
        </div>
        <div className={style.input_grp_gutter}>
          <div className={style.input_group}>
            <img alt="search-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/search_icon.svg'} />
            <input type="text" placeholder="방제목을 입력해주세요." />
            <div className={style.search_btn}>방검색</div>
          </div>
        </div>
        <div className={style.list}>
          {room.map((item, idx) => {
            return (
              <div key={idx} className={style.list_item}>
                <div className={style.list_item_left}>
                  <div className={style.room_no}>{item.roomNum}</div>
                  <div className={style.room_user}>
                    <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                    <p>
                      {item.curUser}/{item.maxUser}
                    </p>
                  </div>
                </div>
                <div className={style.list_item_right}>
                  <div className={style.room_name}>
                    <p>{item.roomId}</p>
                    {item.private ? (
                      <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
                    ) : null}
                  </div>
                  <div className={style.room_status}>
                    {item.waiting ? (
                      <>
                        <p className={style.waiting}>WAITING</p>
                        <div className={style.enter_btn} onClick={() => joinRoom(item.roomId)}>
                          입장
                        </div>
                      </>
                    ) : (
                      <>
                        <p className={style.playing}>PLAYING</p>
                        <div className={style.enter_btn} onClick={() => joinRoom(item.roomId)}>
                          입장
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default RoomList;
