import request from '@/utils/request';

//获取分类列表
export function getClassifyLists(data) {
  return request({
    url: '/classify/list',
    method: 'get',
    params: data
  });
}

//修改开启功能
export function update_isOpen(data) {
  return request({
    url: '/classify/update_isOpen',
    method: 'post',
    data
  });
}

//添加分类
export function create(data) {

  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('file', data.icon);
  formData.append('bg_color', data.bg_color);
  formData.append('is_open', data.is_open);
  formData.append('sort_index', data.sort_index);
  //console.log(formData.getAll('file'));

  return request({
    url: '/classify/create',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//获取某个分类信息
export function getInfo(data) {
  return request({
    url: '/classify/getInfo',
    method: 'get',
    params: data
  });
}

//修改分类
export function update(data) {

  let formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('file', data.icon);
  formData.append('bg_color', data.bg_color);
  formData.append('is_open', data.is_open);
  formData.append('sort_index', data.sort_index);

  //console.log(formData.getAll('file'));

  return request({
    url: '/classify/update',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//删除分类
export function deletes(data) {
  return request({
    url: '/classify/delete',
    method: 'post',
    data
  });
}
