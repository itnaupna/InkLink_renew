import { useRecoilState } from 'recoil';
import style from './list.module.css';
import { listModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import { closeHandler, modalHandler } from './api/modal';

function DrawingList() {
  const [list, setList] = useRecoilState(listModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);

  useEffect(() => {
    modalHandler(list.best, setVisible, setFade);
  }, [list.best]);

  return (
    <div className={`${style.list_box} ${visible} ${fade}`}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={style.drawing_option}>GOAT</div>
            <div className={style.drawing_option}>오늘의 그림</div>
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
            onClick={() => closeHandler(list, 'best', setList, setFade)}
          />
        </div>
        <div className={style.best_list}>
          <div className={style.best}>
            <div className={style.best_position}>
              <div className={style.best_item_text}>1일이삼사오육칠팔구십일이님의 작품</div>
              <div className={style.best_item}>
                <div className={style.best_item_img}>
                  <img alt="best_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
                  <div className={style.like_btn}>
                    <img alt="like_btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_w.svg'} />
                  </div>
                </div>
                <div className={style.best_item_like}>
                  <img alt="likes" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_p.svg'} />
                  <span>99999</span>
                </div>
              </div>
              <div className={`${style.best_item_text} ${style.underline}`}>정답 : 일이삼사오육칠팔구십</div>
            </div>
            <div className={style.best_position}>
              <div className={style.best_item_text}>2일이삼사오육칠팔구십일이님의 작품</div>
              <div className={style.best_item}>
                <div className={style.best_item_img}>
                  <img alt="best_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
                  <div className={style.like_btn}>
                    <img alt="like_btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_w.svg'} />
                  </div>
                </div>
                <div className={style.best_item_like}>
                  <img alt="likes" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_p.svg'} />
                  <span>99999</span>
                </div>
              </div>
              <div className={`${style.best_item_text} ${style.underline}`}>정답 : 일이삼사오육칠팔구십</div>
            </div>
            <div className={style.best_position}>
              <div className={style.best_item_text}>3일이삼사오육칠팔구십일이님의 작품</div>
              <div className={style.best_item}>
                <div className={style.best_item_img}>
                  <img alt="best_img" src={process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg'} />
                  <div className={style.like_btn}>
                    <img alt="like_btn" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_w.svg'} />
                  </div>
                </div>
                <div className={style.best_item_like}>
                  <img alt="likes" src={process.env.REACT_APP_BUCKET_URL + 'icons/best_icon_p.svg'} />
                  <span>99999</span>
                </div>
              </div>
              <div className={`${style.best_item_text} ${style.underline}`}>정답 : 일이삼사오육칠팔구십</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawingList;
