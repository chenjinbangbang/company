import request from '@/utils/request';
import md5 from 'js-md5';

//获取分类列表
export function getLists(){
  return request({
    url: '/classify/list',
    method: 'get'
  });
}

//添加分类
export function create(data){
  return request({
    url: '/classify/create',
    method: 'post',
    data
  });
}

//修改分类
export function update(data){
  return request({
    url: '/classify/update',
    method: 'post',
    data
  });
}

//删除分类
export function deletes(data){
  return request({
    url: '/classify/delete1',
    method: 'post',
    data
  });
}
