import request from '@/utils/request'

// 查询产品质量评价指标参数数值
export function queryIndexList(params) {
    return request({
        url: `/quality_mgr/query/indexList`,
        method: 'get',
        params
    })
}
// 根据编号查询默认设置值
export function queryDefaultValue(params) {
    return request({
        url: `/sys_mgr/defaultSetting_mgr/query/defaultValue`,
        method: 'get',
        params
    })
}

/**
 * @description: 批量修改产品质量评价填报数据
 * @param {*} data
 */
export function modifyFillData(data) {
    return request({
        url: '/quality_mgr/modify/fillData',
        method: 'put',
        data
    })
}

/**
 * @description: 查询月度任务不分页
 * @param {*} params
 */
export function queryMonthTaskNoPageListe(params) {
    return request({
        url: '/task_mgr/query/monthTask/noPageList',
        method: 'get',
        params
    })
}

/**
 * @description: 统一填报各单位月度任务通用数据
 * @param {*} data
 */
export function fillMonthGeneralData(data) {
    return request({
        url: '/task_mgr/fillMonthGeneralData',
        method: 'post',
        data
    })
}
/**
 * @description: 查询质量评价计算标准分页
 * @param {*} params
 */
export function queryCountStandard(params) {
    return request({
        url: `/quality_mgr/countStandard/query/pageList/${params.pageNum}/${params.pageSize}`,
        method: 'get',
        params
    })
}
/**
 * @description: 查询质量评价计算标准详情
 * @param {*} id
 */
export function queryCountStandardDetail(id) {
    return request({
        url: `/quality_mgr/countStandard/query/detail/${id}`,
        method: 'get'
    })
}
/**
 * @description: 添加质量评价计算标准
 * @param {*} data
 */
export function addCountStandard(data) {
    return request({
        url: '/quality_mgr/countStandard/add',
        method: 'post',
        data
    })
}
/**
 * @description: 删除质量评价计算标准
 * @param {*} id
 */
export function deleteCountStandard(id) {
    return request({
        url: `/quality_mgr/countStandard/delete/${id}`,
        method: 'post'
    })
}
/**
 * @description: 修改质量评价计算标准
 * @param {*} data
 */
export function modifyCountStandard(data) {
    return request({
        url: '/quality_mgr/countStandard/modify',
        method: 'put',
        data
    })
}