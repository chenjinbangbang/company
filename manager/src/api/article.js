import request from '@/utils/request';

//获取文章列表
export function getArticleLists() {
  return request({
    url: '/article/list',
    method: 'get'
  });
}

//添加文章
export function create(data) {

  /*let formData = new FormData();
  formData.append('name', data.name);
  formData.append('file', data.icon);*/
  //console.log(formData.getAll('file'));

  return request({
    url: '/article/create',
    method: 'post',
    data,
    /*data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }*/
  });
}

//获取某个文章信息
export function getInfo(data) {
  return request({
    url: '/article/getInfo',
    method: 'get',
    params: data
  });
}

//修改文章
export function update(data) {

  /*let formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('file', data.icon);*/

  //console.log(formData.getAll('file'));

  return request({
    url: '/article/update',
    method: 'post',
    data,
    /*data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }*/
  });
}

//删除文章
export function deletes(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data
  });
}
