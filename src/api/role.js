import request from '@/utils/request'

// 获取角色列表
export const getRoleList = () => {
  return request({
    url: '/sys_mgr/role_mgr/query/allList',
    method: 'get'
  })
}
// 添加
export const add = (data) => {
  return request({
    url: '/sys_mgr/role_mgr/add',
    method: 'post',
    data
  })
}
// 编辑
export const modify = (data) => {
  return request({
    url: '/sys_mgr/role_mgr/modify',
    method: 'put',
    data
  })
}
// 删除
export const del = (id) => {
  return request({
    url: `/sys_mgr/role_mgr/delete/${id}`,
    method: 'delete'
  })
}
// 详情
export const detail = (id) => {
  return request({
    url: `/sys_mgr/role_mgr/query/detail/${id}`,
    method: 'get'
  })
}
// 模糊查询
export const query = (id) => {
  return request({
    url: `/sys_mgr/role_mgr/query/likeList/${id}`,
    method: 'get'
  })
}

// 为某个角色授权
export const setAuthByRoleId = (roleId,data) => {
  return request({
    url: `/sys_mgr/role_mgr/auth/${roleId}`,
    method: 'post',
    data
  })
}
// 查询角色的权限
export const queryRoleAuth = (roleId) => {
  return request({
    url: `/sys_mgr/role_mgr/query/authIds/${roleId}`,
    method: 'get'
  })
}

//为某个角色批量分配人员 
export const setAssignUserByRoleId = (roleId,data) => {
  return request({
    url: `/sys_mgr/role_mgr/assign/${roleId}`,
    method: 'post',
    data
  })
}

// 为某个角色批量/单个删除人员
export const unassignByRoleId = (roleId,data) => {
  return request({
    url: `/sys_mgr/role_mgr/unassign/${roleId}`,
    method: 'delete',
    data
  })
}