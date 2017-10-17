import axios from 'axios';
import { Toast } from 'antd-mobile';

export const _http = axios.create({
  baseURL: '',
  timeout: 500000,
  withCredentials: true, // 允许跨域 cookie
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  }
});

_http.interceptors.response.use(
  (res: any) => {
    if (!res.data.status) {
      return res.data;
    } else {
      return res.data;
    }
  },
  (error: any) => {
    Toast.offline('error net', 1);
    window.console.log(error);
    if (error.response) {
      return Promise.reject({
        response: error.response,
        error: error.response.data.msg,
        status: error.response.status,
        statusText: error.response.statusText
      });
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
);

let http: any = {};

http.get = (url: string = '', data: object = {}) => {
  return _http.get(url, {params: data});
};

http._put = (url: string = '', data: object = {}) => {
  return _http.put(url, data);
};

http._post = (url: string = '', data: object = {}) => {
  return _http.post(url, data);
};

http._delete = (url: string = '', data: object = {}) => {
  return _http.delete(url, data);
};

export default http;