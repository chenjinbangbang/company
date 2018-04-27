import request from '@/utils/request';

//获取文章列表
export function getArticleLists(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params: data
  });
}

//修改开启功能
export function update_isOpen(data) {
  return request({
    url: '/article/update_isOpen',
    method: 'post',
    data
  });
}

//添加文章
export function create(data) {

  let formData = new FormData();
  formData.append('title', data.title);
  formData.append('uid', data.uid);
  formData.append('phone', data.phone);
  formData.append('is_open', data.is_open);
  formData.append('sort_index', data.sort_index);
  formData.append('price', data.price === undefined ? 0 : data.price );
  formData.append('unit_square', data.unit_square === undefined ? 0 : data.unit_square );
  formData.append('unit_square_x', data.unit_square_x);
  formData.append('unit_time', data.unit_time);
  formData.append('price_original', data.price_original === undefined ? 0 : data.price_original );
  formData.append('unit_square_original', data.unit_square_original === undefined ? 0 : data.unit_square_original );
  formData.append('unit_square_original_x', data.unit_square_original_x);
  formData.append('unit_time_original', data.unit_time_original);
  formData.append('content', data.content);
  //文件处理
  data.images.forEach(item => {
    formData.append('files',item);
  });
  console.log(formData.getAll("files"));

  return request({
    url: '/article/create',
    method: 'post',
    //data,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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

  return request({
    url: '/article/update',
    method: 'post',
    data,
    //data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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

function objectToFormData(obj, form, namespace) {
  const fd = form || new FormData();
  let formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      let key = Array.isArray(obj) ? '[]' : `[${property}]`;
      if (namespace) {
        formKey = namespace + key;
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey);
      } else {

        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }

    }
  }

  return fd;

}
