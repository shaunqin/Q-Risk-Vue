import request from '@/utils/request'


// 流程详情
export const processDetail = (businessId, businessType) => {
    return request({
        url: `/process_mgr/query/detail/${businessId}/${businessType}`,
        method: 'get',
    })
}
// ======== 风险提示 =======
// 历史版本详情
export function getOriginFormByCommentId(params) {
    return request({
        url: `/riskmgr_mgr/safety_risk_notice_mgr/getOriginFormByCommentId`,
        method: 'get',
        params
    })
}
// 下发树形懒加载
export function riskNoticeLazyLoadIssueTree(measureId) {
    return request({
        url: `/riskmgr_mgr/safety_risk_notice_mgr/subMeasures/${measureId}`,
        method: 'get',
    })
}
// 取消任务
export function riskNoticeLazyCancel(id) {
    return request({
        url: `/riskmgr_mgr/safety_risk_notice_mgr/cancel/${id}`,
        method: 'delete',
    })
}
// 流程图
export function riskNoticeLazyProcessChart(id) {
    return request({
        url: `/riskmgr_mgr/safety_risk_notice_mgr/echartsTreeData/${id}`,
        method: 'get',
    })
}
// ======== 风险提示 end =======

// ======== 隐患排查 ===========
// 历史版本详情
export function hiddenDangerGetOriginFormByCommentId(params) {
    return request({
        url: `/riskmgr_mgr/hidden_danger/getOriginFormByCommentId`,
        method: 'get',
        params
    })
}
// 取消任务
export function hiddenDangerCancel(taskId) {
    return request({
        url: `/riskmgr_mgr/hidden_danger/cancel/${taskId}`,
        method: 'delete',
    })
}
// 查询树形下发措施
export function hiddenDangerSubIssueTreeData(monthTaskId) {
    return request({
        url: `/riskmgr_mgr/hidden_danger/subMonthTask/${monthTaskId}`,
        method: 'get',
    })
}
// 流程图
export function hiddenDangerLazyProcessChart(id) {
    return request({
        url: `/riskmgr_mgr/hidden_danger/echartsTreeData/${id}`,
        method: 'get',
    })
}
// 查看管控清单详情
export const queryControlListDetail = (monthTaskId) => {
    return request({
        url: `/riskmgr_mgr/hidden_danger/query/controlList/${monthTaskId}`,
        method: 'get',
    })
}
// ======== 隐患排查 end =======
