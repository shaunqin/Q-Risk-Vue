import request from '@/utils/request'

// add
export const add = (data) => {
    return request({
        url: '/sys_mgr/defaultSetting_mgr/add',
        method: 'post',
        data
    })
}

// del
export const del = (id) => {
    return request({
        url: `/sys_mgr/defaultSetting_mgr/delete/${id}`,
        method: 'post'
    })
}

// modify
export const modify = (data) => {
    return request({
        url: '/sys_mgr/defaultSetting_mgr/modify',
        method: 'put',
        data
    })
}

// detail
export const detail = (id) => {
    return request({
        url: `/sys_mgr/defaultSetting_mgr/query/detail/${id}`,
        method: 'get'
    })
}