import { useEffect, useState } from 'react';
import style from './main.module.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mainModal, detailModal } from '../../../../recoil/lobby';
import { noticeDetail } from '../../../../recoil/detail';
import noticeData from '../../../../deleteme/notice.json';

function Notice() {
  const [main, setMain] = useRecoilState(mainModal);
  const [visible, setVisible] = useState<string>(style.notice_hide);
  const [fade, setFade] = useState<string>(style.notice_hide);
  const [down, setDown] = useState<string>('');
  const [detail, setDetail] = useRecoilState(detailModal);
  const setNotice = useSetRecoilState(noticeDetail);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (main.notice) {
      setDown(style.down);
      setVisible(style.d_show);
      setFade(style.notice_fade_in);
    } else {
      setDown('');
      setFade(style.notice_fade_out);
      timer = setTimeout(() => {
        setVisible(style.notice_hide);
      }, 300);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [main.notice]);

  const dropDownHandler = () => {
    setMain({ ...main, notice: !main.notice });
  };

  const noticeHandler = (item: NoticeType) => {
    setDetail({ ...detail, notice: true });
    setNotice(item);
  };

  return (
    <div className={`${style.notice_box} ${style.ml_1}`}>
      <div className={style.notice_window}>
        <div className={style.notice_grp}>
          <div className={style.notice_icon}>
            <img alt="notice-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/notice_icon.svg'} />
            <span>공지사항</span>
          </div>
          <div className={style.notice_preview}>
            <div className={style.notice_prev_left}>
              <img alt="new-icon" src={process.env.REACT_APP_BUCKET_URL + 'icons/new_icon.svg'} />
              <span className={style.notice_prev_type}>[{noticeData[0].type}]</span>
              <div className={style.notice_prev_title} onClick={() => noticeHandler(noticeData[0])}>
                {noticeData[0].title}
                {noticeData[0].title}
                {noticeData[0].title}
              </div>
            </div>
            <div className={style.notice_prev_date}>{noticeData[0].date}</div>
          </div>
          <img
            className={`${style.notice_drop_down} ${down}`}
            alt="drop-down"
            src={process.env.REACT_APP_BUCKET_URL + 'icons/drop_down_icon.svg'}
            onClick={dropDownHandler}
          />
        </div>
      </div>
      <div className={`${style.notice_detail} ${visible} ${fade}`}>
        {noticeData.map((item, idx) => {
          return (
            <div key={idx} className={`${style.notice_list} ${idx % 2 === 0 ? '' : style.bg_gray}`}>
              <div className={style.notice_prev_left}>
                <div className={style.notice_type}>[{item.type}]</div>
                <div className={style.notice_title} onClick={() => noticeHandler(item)}>
                  {item.title}
                  {item.title}
                  {item.title}
                  {item.title}
                  {item.title}
                </div>
              </div>
              <div className={style.notice_date}>{item.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notice;
