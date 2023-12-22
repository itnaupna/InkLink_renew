import { useRecoilState, useRecoilValue } from 'recoil';
import style from './main.module.css';
import { mainModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import { closeHandler, modalHandler } from '../../../../api/modal';

function Chat() {
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);


  useEffect(() => {
    modalHandler(style, main.chat, setVisible, setFade);
  }, [main.chat]);

  return (
    <div className={`${style.lg_box} ${style.mr_1} ${visible} ${fade}`}>
      <div className={style.close_btn}>
        <img
          alt="close-btn"
          src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn.svg'}
          onClick={() => closeHandler(style, main, 'chat', setMain, setFade)}
        />
      </div>
      <div className={style.detail_box_bottom}>
        <div className={style.detail}>
          <div className={style.chat_field}>
            <div className={style.chat_content}>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
              <div className={style.chat_msg}>
                <span className={style.chat_id}>일이삼사오육칠팔</span>: 123123121=231231231231231231231231321231213
              </div>
            </div>
          </div>
        </div>
        <div className={style.chat_input_group}>
          <input type="text" />
          <div className={style.chat_send_btn}>
            <img alt="send-btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/send_icon.svg'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
