import { observable } from 'mobx';
import http from '../assets/js/axios';
import { userData } from './types';

class AppState {

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
  
  constructor() {
    this.setUsrInfo = this.setUsrInfo.bind(this);
    this.updateUsrInfo = this.updateUsrInfo.bind(this);
  }
  
  setUsrInfo = (data: any) => {
    this.userData = { ...this.userData, ...data };
  }

  updateUsrInfo = (data: any) => {
    return http.put('/user/api/update', data)
      .then((res: any) => {
        if (!res.status) {
          this.setUsrInfo(data);
          return true;
        } else {
          return false;
        }
      });
  }
  bindPhone = (val: any) => {
    this.userData.phoneNumber = val;
  }
}

export default AppState;