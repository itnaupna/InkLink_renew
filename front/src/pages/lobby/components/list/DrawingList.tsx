import style from './list.module.css';

function DrawingList() {
  return (
    <div className={style.list_box}>
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
          />
        </div>
        <div className={style.best_list}>
          <div className={style.best}>
            <div>
              <div className={style.best_item_text}>일이삼사오육칠팔구십일이님의 작품</div>
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
            <div>
              <div className={style.best_item_text}>일이삼사오육칠팔구십일이님의 작품</div>
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
            <div>
              <div className={style.best_item_text}>일이삼사오육칠팔구십일이님의 작품</div>
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
