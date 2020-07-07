import request from '@/utils/request'

// 角色授权
export function changeFuncAuth(data) {
  return request({
    url: '/sys_mgr/auth_mgr/modify',
    method: 'put',
    data
  })
}

// 查询权限列表
export function pageListByRole(roleId) {
  return request({
    url: `/sys_mgr/auth_mgr/query/pageList/byRole/${roleId}`,
    method: 'get'
  })
}

// 重置所有权限
export function resetAllModuleRoleAuth() {
  return request({
    url: '/sys_mgr/auth_mgr/resetAllModuleRoleAuth',
    method: 'put'
  })
}

// 新增菜单
export function add(data) {
  return request({
    url: '/sys_mgr/module_mgr/add',
    method: 'post',
    data
  })
}
// 编辑菜单
export function modify(data) {
  return request({
    url: '/sys_mgr/module_mgr/modify',
    method: 'put',
    data
  })
}
// 删除菜单
export function del(id) {
  return request({
    url: `/sys_mgr/module_mgr/delete/${id}`,
    method: 'delete'
  })
}