import axios from 'axios';
import { message } from 'ant-design-vue';
import router from './router';
import { store } from './store';
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('=====config:', config);
  const token = store.token;
  let newConfig;
  if(token){
    const { headers } = config;
    newConfig = {
      ...config,
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  } else {
    newConfig = config;
  }
  
  return newConfig;
  // return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('=====response:', response);
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  console.log('=====error:', error);
  const { response } = error;
  const { data } = response;
  const { code } = data;
  if(code && code === "401") {
    // 提示登录失效，然后跳转到登录页面
    message.info({
      content: "登录过期，需要重新登录。稍后将为你跳转到登录页面",
      duration: 2,
      onClose: ()=>{
        store.updateToken("");
        router.push('/login')
      }
    });
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(data);
});