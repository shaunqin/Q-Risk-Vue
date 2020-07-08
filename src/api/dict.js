import request from '@/utils/request'

// 删除
export const del = (id) => {
  return request({
    url: `/sys_mgr/sys_dic/delete/${id}`,
    method: 'delete'
  })
}
// 添加
export const add = (data) => {
  return request({
    url: '/sys_mgr/sys_dic/add',
    method: 'post',
    data
  })
}
// 编辑
export const modify = (data) => {
  return request({
    url: '/sys_mgr/sys_dic/modify',
    method: 'put',
    data
  })
}
// 查询
export const detail = (id) => {
  return request({
    url: `/sys_mgr/sys_dic/query/detail/${id}`,
    method: 'get'
  })
}
// 分页
export const getPageList = (page, size) => {
  return request({
    url: `/sys_mgr/sys_dic/query/allList`,
    method: 'get'
  })
}

// 字典树
export const getDictTree = () => {
  return request({
    url: `/sys_mgr/sys_dic/query/tree`,
    method: 'get'
  })
}

// 查询第一层字典树
export const queryDictByName = (name) => {
  return request({
    url: `/sys_mgr/sys_dic/query/dict/${name}`,
    method: 'get'
  })
}