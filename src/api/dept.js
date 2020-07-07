import request from '@/utils/request'

// 部门树
export const getDeptTree = () => {
  return request({
    url: '/sys_mgr/department_mgr/query/tree',
    method: 'get'
  })
}

// 新增部门
export const add = (data) => {
  return request({
    url: '/sys_mgr/department_mgr/add',
    method: 'post',
    data
  })
}

// 修改部门
export const modify = (data) => {
  return request({
    url: '/sys_mgr/department_mgr/update',
    method: 'put',
    data
  })
}

// 删除部门
export const deleteDept = (deptId) => {
  return request({
    url: `/sys_mgr/department_mgr/delete/${deptId}`,
    method: 'delete'
  })
}