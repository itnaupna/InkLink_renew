import { SetterOrUpdater } from 'recoil';

const mainMenu = (type: string, main: MainType, setMain: SetterOrUpdater<MainType>) => {
  switch (type) {
    case 'profile':
      setMain({ ...main, show: 0, profile: true });
      break;

    case 'chat':
      setMain({ ...main, show: 0, chat: true });
      break;

    case 'member':
      setMain({ ...main, show: 0, memberList: true });
      break;
  }
};

const listMenu = (type: string, listData: ListType, setList: SetterOrUpdater<ListType>) => {
  switch (type) {
    case 'room':
      listData.room = true;
      setList(listData);
      break;

    case 'best':
      listData.best = true;
      setList(listData);
      break;

    case 'shop':
      listData.shop = true;
      setList(listData);
      break;
  }
};

export { mainMenu, listMenu };
