import request from '@/utils/request'

// 部门树
export const getDeptTree = (params) => {
  return request({
    url: '/sys_mgr/department_mgr/query/tree',
    method: 'get',
    params
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

// 根据id查询父部门
export const queryParentDept = (deptId) => {
  return request({
    url: `/sys_mgr/department_mgr/query/parent/${deptId}`,
    method: 'get'
  })
}