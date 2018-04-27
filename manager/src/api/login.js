import request from '@/utils/request';
import md5 from 'js-md5';

//登录接口
export function login(data){

  data.username = data.username.trim();
  data.password = md5(data.password.trim());
  console.log(data.password);

  return request({
    url: '/users/login',
    method: 'post',
    data
  });
}

//修改密码
export function changePwd(data){

  let password = md5(data.password.trim());

  return request({
    url: '/users/changePwd',
    method: 'post',
    data: { password }
  });
}
