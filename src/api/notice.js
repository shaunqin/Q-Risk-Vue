import request from '@/utils/request'

// add
export const add = (data) => {
  return request({
    url: `/sys_mgr/announcement_mgr/add`,
    method: 'post',
    data
  })
}
// modify
export const modify = (data) => {
  return request({
    url: `/sys_mgr/announcement_mgr/modify`,
    method: 'put',
    data
  })
}
// detail
export const detail = (id) => {
  return request({
    url: `/sys_mgr/announcement_mgr/query/detail/${id}`,
    method: 'get'
  })
}

// del
export const del = (data) => {
  return request({
    url: `/sys_mgr/announcement_mgr/delete`,
    method: 'delete',
    data
  })
}
