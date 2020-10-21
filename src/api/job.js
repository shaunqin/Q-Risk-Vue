import request from '@/utils/request'

// add
export const add = (data) => {
    return request({
        url: `/sys_mgr/job/add`,
        method: 'post',
        data
    })
}

// modify
export const modify = (data) => {
    return request({
        url: `/sys_mgr/job/modify`,
        method: 'put',
        data
    })
}

// modifyStatus
export const modifyStatus = (data) => {
    return request({
        url: `/sys_mgr/job/changeStatus`,
        method: 'put',
        data
    })
}

// detail
export const detail = (jobId) => {
    return request({
        url: `/sys_mgr/job/query/detail/${jobId}`,
        method: 'get'
    })
}

// del
export const del = (jobId) => {
    return request({
        url: `/sys_mgr/job/${jobId}`,
        method: 'delete'
    })
}

// run
export const run = (jobId) => {
    return request({
        url: `/sys_mgr/job/run/${jobId}`,
        method: 'put'
    })
}

// ==========  log ==========
// detailLog
export const detailLog = (jobLogId) => {
    return request({
        url: `/sys_mgr/job_log/query/detail/${jobLogId}`,
        method: 'get'
    })
}
// delLog
export const delLog = (jobLogIds) => {
    return request({
        url: `/sys_mgr/job_log/${jobLogIds}`,
        method: 'delete'
    })
}
// clean
export const cleanLog = () => {
    return request({
        url: `/sys_mgr/job_log/clean`,
        method: 'delete'
    })
}