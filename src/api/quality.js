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