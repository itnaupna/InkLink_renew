import style from './list.module.css';

function RoomList() {
  return (
    <div className={style.list_box}>
      <div className={style.list_window}>
        <div className={style.list_header}>
          <div className={style.list_btn_box}>
            <div className={style.room_btn}>방생성</div>
            <div className={style.room_btn}>퀵매칭</div>
          </div>
          <img
            className={style.close_btn}
            alt="close-btn"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/close_btn_w.svg'}
          />
        </div>
        <div className={style.input_grp_gutter}>
          <div className={style.input_group}>
            <img alt="search-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/search_icon.svg'} />
            <input type="text" />
            <div className={style.search_btn}>방검색</div>
          </div>
        </div>
        <div className={style.list}>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.waiting}>WAITING</p>
                <div className={style.enter_btn}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.waiting}>WAITING</p>
                <div className={style.enter_btn}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
          <div className={style.list_item}>
            <div className={style.list_item_left}>
              <div className={style.room_no}>001</div>
              <div className={style.room_user}>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/user_icon.svg'} />
                <p>10/10</p>
              </div>
            </div>
            <div className={style.list_item_right}>
              <div className={style.room_name}>
                <p>일이삼사오육칠팔구십일이삼사오</p>
                <img alt="user-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/lock_icon.svg'} />
              </div>
              <div className={style.room_status}>
                <p className={style.playing}>PLAYING</p>
                <div className={`${style.enter_btn} ${style.block}`}>입장</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomList;
