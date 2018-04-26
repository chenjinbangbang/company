import axios from 'axios';
import { Message } from 'element-ui';
//import store from '@/vuex';
import { getUsername } from '@/utils/auth';

const service = axios.create({
    baseURL: process.env.BASE_API,
    withCredentials: true,
    timeout: 5000,
});

service.interceptors.request.use(config => {
    //console.log(process.env.NODE_ENV);
    // if(store.getters.username){
    //     config.headers['username'] = getUsername();
    // }



    return config;
},error => {
    Promise.reject(error);
});

service.interceptors.response.use(response => {
    let res = response.data;

    if(res.error_code > 0){
        Message.warning({message: res.data,center: true});
    }

    return res;
},error => {
    Message({ message: error.message, type: 'error', duration: 2000,center:true});
    return Promise.reject(error);
});

export default service;
