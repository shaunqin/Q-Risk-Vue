import request from '@/utils/request'

//模型设计 add
export const addModel = (data) => {
    return request({
        url: `/risk_mgr/model_mgr/add`,
        method: 'post',
        data
    })
}
//模型设计 modify
export const modifyModel = (data) => {
    return request({
        url: `/risk_mgr/model_mgr/modify`,
        method: 'put',
        data
    })
}
//模型设计 del
export const delModel = (id) => {
    return request({
        url: `/risk_mgr/model_mgr/delete/${id}`,
        method: 'post'
    })
}
//模型设计 enable
export const enableModel = (data) => {
    return request({
        url: `/risk_mgr/model_mgr/enable`,
        method: 'put',
        data
    })
}
