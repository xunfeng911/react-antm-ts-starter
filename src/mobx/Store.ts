import { observable } from 'mobx';
import http from '../assets/js/axios';
import { userData } from './types';

class Store {

  @observable
  userData: userData = {
    nickName: '风灵薰',
    name: '',
    sex: 1,
    headImgUrl: 'http://tvax1.sinaimg.cn/crop.0.0.1328.1328.180/bfd220cdly8fihfobinj7j210w10wq53.jpg',
    id: 0,
    showNote: true,
    isCloumn: true
  };
  
  setUsrInfo = (data: any) => {
    this.userData = { ...this.userData, ...data };
  }
}

export default Store;