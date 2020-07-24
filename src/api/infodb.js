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