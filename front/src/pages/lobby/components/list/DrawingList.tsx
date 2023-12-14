import { useRecoilState } from 'recoil';
import style from './list.module.css';
import { listModal, mainModal } from '../../../../recoil/lobby';
import { useEffect, useState } from 'react';
import { closeHandler, modalHandler } from '../../../../api/modal';

function DrawingList() {
  const [list, setList] = useRecoilState(listModal);
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.d_hide);
  const [fade, setFade] = useState<string>(style.fade_out);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    modalHandler(style, list.best, setVisible, setFade);
  }, [list.best]);

  const closeModal = () => {
    setMain({ ...main, show: 0 });
    closeHandler(style, list, 'best', setList, setFade);
  };

  const tabHandler = (idx: number) => {
    setTab(idx);
  };

  return (
    <div className={`${style.list_box} ${visible} ${fade}`}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={`${style.drawing_option} ${tab === 0 ? style.selected : ''}`} onClick={() => tabHandler(0)}>
              최고의 그림
            </div>
            <div className={`${style.drawing_option} ${tab === 1 ? style.selected : ''}`} onClick={() => tabHandler(1)}>
              오늘의 그림
            </div>
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
            onClick={closeModal}
          />
        </div>
        {[<BestDrawing />, <TodayDrawing />][tab]}
      </div>
    </div>
  );
}

function BestDrawing() {
  return (
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
  );
}

function TodayDrawing() {
  return (
    <div className={style.today}>
      <div className={style.today_item_box}>
        <div className={style.best_item_text}> 작품</div>
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
      <div className={style.today_item_box}>
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
      <div className={style.today_item_box}>
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
      <div className={style.today_item_box}>
        <div className={style.best_item_text}> 작품</div>
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
      <div className={style.today_item_box}>
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
      <div className={style.today_item_box}>
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
      <div className={style.today_item_box}>
        <div className={style.best_item_text}> 작품</div>
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
      <div className={style.today_item_box}>
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
      <div className={style.today_item_box}>
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
  );
}
export default DrawingList;
