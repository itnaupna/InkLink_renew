import { SetterOrUpdater } from 'recoil';

const modalHandler = (
  style: { [key: string]: string },
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
  style: { [key: string]: string },
  modal: MainType | ListType,
  type: keyof MainType | keyof ListType,
  setState: SetterOrUpdater<any>,
  setFade: React.Dispatch<React.SetStateAction<string>>
) => {
  setFade(style.fade_out);
  let timer = setTimeout(() => {
    setState({ ...modal, [type]: false });
  }, 200);

  return () => {
    clearTimeout(timer);
  };
};

export { modalHandler, closeHandler };
