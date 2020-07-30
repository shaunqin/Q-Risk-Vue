import request from '@/utils/request'

// 监督自查 detail
export const detailSupervise = (id) => {
    return request({
        url: `/info_mgr/supervise_mgr/query/detail/${id}`,
        method: 'get'
    })
}

// 监督自查 modify
export const modifySupervise = (data) => {
    return request({
        url: `/info_mgr/supervise_mgr/modify`,
        method: 'put',
        data
    })
}

// 安全自查 detail
export const detailSuperviseSa = (id) => {
    return request({
        url: `/info_mgr/supervise_mgr/query/detailSa/${id}`,
        method: 'get'
    })
}
// 安全自查 modify
export const modifySuperviseSa = (data) => {
    return request({
        url: `/info_mgr/supervise_mgr/modifySa`,
        method: 'put',
        data
    })
}

// 质量审核 detail
export const detailQualityAduit = (id) => {
    return request({
        url: `/info_mgr/infoAudit_mgr/query/detail/${id}`,
        method: 'get'
    })
}
// 质量审核 modify
export const modifyQualityAduit = (data) => {
    return request({
        url: `/info_mgr/infoAudit_mgr/modify`,
        method: 'put',
        data
    })
}

// 外部检查 detail
export const detailExternalInspection = (id) => {
    return request({
        url: `/info_mgr/infoAudit_mgr/query/detailSa/${id}`,
        method: 'get'
    })
}
// 外部检查 modify
export const modifyExternalInspection = (data) => {
    return request({
        url: `/info_mgr/infoAudit_mgr/modifySa`,
        method: 'put',
        data
    })
}

// 安全调查|质量调查|客户投诉 add
export const addInfobase = (data) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/add`,
        method: 'post',
        data
    })
}

// 安全调查|质量调查|客户投诉 modify
export const modifyInfobase = (data) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/modify`,
        method: 'put',
        data
    })
}

// 安全调查|质量调查|客户投诉 detail
export const detailInfobase = (id) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/query/detail/${id}`,
        method: 'get'
    })
}
// 安全调查|质量调查|客户投诉 del
export const delInfobase = (id) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/delete/${id}`,
        method: 'delete'
    })
}