import request from '@/utils/request'

// 质量审核|外部检查|监督自查|安全自查 add
export const addSupervise = (data) => {
    return request({
        url: `/info_mgr/supervise_mgr/add`,
        method: 'post',
        data
    })
}

// 质量审核|外部检查|监督自查|安全自查 detail
export const detailSupervise = (id) => {
    return request({
        url: `/info_mgr/supervise_mgr/query/detail/${id}`,
        method: 'get'
    })
}

// 质量审核|外部检查|监督自查|安全自查 modify
export const modifySupervise = (data) => {
    return request({
        url: `/info_mgr/supervise_mgr/modify`,
        method: 'put',
        data
    })
}
// 质量审核|外部检查|监督自查|安全自查 del
export const delSupervise = (id) => {
    return request({
        url: `/info_mgr/supervise_mgr/delete/${id}`,
        method: 'post'
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
// 安全调查|质量调查|客户投诉 导入
export const addByExcel = (data) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/addByExcel`,
        method: 'post',
        data
    })
}
// 安全调查|质量调查|客户投诉 导出
export const downloadToExcel = (params) => {
    return request({
        url: `/infoDatabase_mgr/infoDatabase_mgr/downloadToExcel`,
        method: 'get',
        params,
        // responseType: "blob"
    })
}