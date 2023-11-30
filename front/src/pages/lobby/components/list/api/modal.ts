import { SetterOrUpdater } from 'recoil';
import style from '../list.module.css';

const modalHandler = (
  type: boolean,
  setVisible: React.Dispatch<React.SetStateAction<string>>,
  setFade: React.Dispatch<React.SetStateAction<string>>
) => {
  let timer: ReturnType<typeof setTimeout>;
  if (type) {
    setVisible(style.d_show);
    timer = setTimeout(() => {
      setFade(style.fade_in);
    }, 100);
  } else {
    setFade(style.fade_out);
    setVisible(style.d_hide);
  }

  return () => {
    clearTimeout(timer);
  };
};

const closeHandler = (
  list: ListType,
  type: keyof ListType,
  setList: SetterOrUpdater<ListType>,
  setFade: React.Dispatch<React.SetStateAction<string>>
) => {
  setFade(style.fade_out);
  let timer = setTimeout(() => {
    setList({ ...list, [type]: false });
  }, 200);

  return () => {
    clearTimeout(timer);
  };
};

export { modalHandler, closeHandler };
