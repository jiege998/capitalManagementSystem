import axios from 'axios'
const Axios = axios.create({
    baseURL:'/api',
    timeout:5000
})
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router'
let loading =''
Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
     loading = ElLoading.service({
        lock: true,
        text: '加载中....',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (sessionStorage.Authorization) {
        config.headers.Authorization = sessionStorage.Authorization
       }
    return config;
  }, function (error) {
    // Do something with request error
    ElMessage.error('服务器异常')
    return Promise.reject(error);
});
Axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    loading.close()
    if(response.data.code == 0 && response.data.msg){
        ElMessage.success(response.data.msg)
    }else if(response.data.code ==1){
        ElMessage.error(response.data.msg)
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    loading.close()
    if(error.response.status == 401){
        ElMessage.error('token失效了')
        router.push('/')
    }else{
        ElMessage.error('服务器异常')
    }
    return Promise.reject(error);
  });
// Axios.defaults.timeout = 2500;
export default Axios