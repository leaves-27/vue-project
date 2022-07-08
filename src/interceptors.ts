import axios from 'axios';
import { message } from 'ant-design-vue';
import router from './router';
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('=====config:', config);
  const token = localStorage.getItem('token');
  let newConfig;
  if(token){
    const { headers } = config;
    newConfig = {
      ...config,
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  } else {
    newConfig = config;
  }
  
  return newConfig;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('=====response:', response);
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  console.log('=====error:', error);
  const { response } = error;
  const { data } = response;
  const { code } = data;
  if(code === "401") {
    // 提示登录失效，然后跳转到登录页面
    message.info({
      content: "登录过期，需要重新登录。稍后将为你跳转到登录页面",
      duration: 2,
      onClose: ()=>{
        router.push('/login')
      }
    });
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});