import axios from 'axios';
import cookie from 'js-cookie';
import router from '../router';

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://api.pixivic.com',
  // baseURL: 'https://v1.api.pixivic.com',
  // baseURL: "https://search.api.pixivic.com",
  // baseURL: 'http://114.67.107.177:8080',
  headers: {
    // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJwZXJtaXNzaW9uTGV2ZWwiOjEsInJlZnJlc2hDb3VudCI6MSwiaXNCYW4iOjEsInVzZXJJZCI6MTAsImlhdCI6MTU3MTQ4MzE3MywiZXhwIjoxNTczMjExMTczfQ.PPip1ncfMtUhYMPFOk7ZNln7pPJ1Sb4UMri6VYtbB9FcQscaCe-nevmCM2IWPT7B35Wf6x2cnUjfMSUl86dstg'
  },
  timeout: 20000,
  validateStatus(status) {
    return status >= 200 && status < 600;
  }
});

instance.interceptors.request.use(
  config => {
    if (cookie.get('jwt')) {
      config.headers.authorization = cookie.get('jwt');
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // console.log('response', response);
    if (response.headers.hasOwnProperty('authorization')) {
      cookie.set('jwt', response.headers.authorization, {
        expires: 365
      });
    }
    if (response.status === 401) {
      // 登录过期
      cookie.remove('jwt');
      localStorage.remove('user');
      router.push('/login');
    }
    return response;
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);

export default instance;
