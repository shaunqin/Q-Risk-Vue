import request from '@/utils/request'

// 产品系统分页列表
export const queryProdList = (params) => {
  return request({
    url: `/info_mgr/prod_mgr/query/pageList/${params.pageNum}/${params.pageSize}`,
    method: 'get',
    params
  })
}

// 查询产品详情
export const queryProdDetail = (id) => {
  return request({
    url: `/info_mgr/prod_mgr/query/detail/${id}`,
    method: 'get'
  })
}

//新增产品
export const addProd = (data) => {
  return request({
    url: `/info_mgr/prod_mgr/add`,
    method: 'post',
    data
  })
}

//编辑产品
export const modifyProd = (data) => {
  return request({
    url: `/info_mgr/prod_mgr/modify`,
    method: 'put',
    data
  })
}

//删除产品
export const delProd = (id) => {
  return request({
    url: `/info_mgr/prod_mgr/delete/${id}`,
    method: 'delete'
  })
}

//危险源列表
export const queryHazardList = (params) => {
  return request({
    url: `/info_mgr/hazard_mgr/query/list`,
    method: 'get',
    params
  })
}
//危险源 add
export const addHazard = (data, params) => {
  return request({
    url: `/info_mgr/hazard_mgr/add`,
    method: 'post',
    data,
    params
  })
}
//危险源 modify
export const modifyHazard = (data, params) => {
  return request({
    url: `/info_mgr/hazard_mgr/modify`,
    method: 'put',
    data,
    params
  })
}
//危险源 del
export const delHazard = (id) => {
  return request({
    url: `/info_mgr/hazard_mgr/delete/${id}`,
    method: 'post'
  })
}

// 风险清单 - list
export const queryRiskLisk = (params) => {
  return request({
    url: `/info_mgr/riskList_mgr/query/list`,
    method: 'get',
    params
  })
}
// 风险清单 - add
export const addRisk = (data) => {
  return request({
    url: `/info_mgr/riskList_mgr/add`,
    method: 'post',
    data
  })
}
//编辑风险清单
export const modifyRisk = (data) => {
  return request({
    url: `/info_mgr/riskList_mgr/modify`,
    method: 'put',
    data
  })
}

//删除风险清单
export const delRisk = (id) => {
  return request({
    url: `/info_mgr/riskList_mgr/delete/${id}`,
    method: 'post'
  })
}
// 查询风险清单详情
export const queryRiskDetail = (id) => {
  return request({
    url: `/info_mgr/riskList_mgr/query/detail/${id}`,
    method: 'get'
  })
}

// 其他标准 add
export const addOtherStand = (data) => {
  return request({
    url: `/info_mgr/other_standard_mgr/add`,
    method: 'post',
    data
  })
}
// 其他标准 detail
export const detailOtherStand = (id) => {
  return request({
    url: `/info_mgr/other_standard_mgr/query/detail/${id}`,
    method: 'get'
  })
}
// 其他标准 modify
export const modifyOtherStand = (data) => {
  return request({
    url: `/info_mgr/other_standard_mgr/modify`,
    method: 'put',
    data
  })
}
// 其他标准 del
export const delOtherStand = (id) => {
  return request({
    url: `/info_mgr/other_standard_mgr/delete/${id}`,
    method: 'delete'
  })
}

//风险等级 add
export const addRiskLevel = (data) => {
  return request({
    url: `/info_mgr/riskLevel_mgr/add`,
    method: 'post',
    data
  })
}
//风险等级 detail
export const detailRiskLevel = (id) => {
  return request({
    url: `/info_mgr/riskLevel_mgr/query/detail/${id}`,
    method: 'get'
  })
}
//风险等级 modify
export const modifyRiskLevel = (data) => {
  return request({
    url: `/info_mgr/riskLevel_mgr/modify`,
    method: 'put',
    data
  })
}
//风险等级 del
export const delRiskLevel = (id) => {
  return request({
    url: `/info_mgr/riskLevel_mgr/delete/${id}`,
    method: 'delete'
  })
}

// 条件概率 add
export const addProbability = (data) => {
  return request({
    url: `/info_mgr/probability_mgr/add`,
    method: 'post',
    data
  })
}
// 条件概率 detail
export const detailProbability = (id) => {
  return request({
    url: `/info_mgr/probability_mgr/query/detail/${id}`,
    method: 'get'
  })
}
// 条件概率 modify
export const modifyProbability = (data) => {
  return request({
    url: `/info_mgr/probability_mgr/modify`,
    method: 'put',
    data
  })
}
// 条件概率 del
export const delProbability = (id) => {
  return request({
    url: `/info_mgr/probability_mgr/delete/${id}`,
    method: 'delete'
  })
}

// 风险等级标准 add
export const addRiskLevelStandard = (data) => {
  return request({
    url: `/info_mgr/risk_value_standard_mgr/add`,
    method: 'post',
    data
  })
}
// 风险等级标准 detail
export const detailRiskLevelStandard = (id) => {
  return request({
    url: `/info_mgr/risk_value_standard_mgr/query/detail/${id}`,
    method: 'get'
  })
}
// 风险等级标准 modify
export const modifyRiskLevelStandard = (data) => {
  return request({
    url: `/info_mgr/risk_value_standard_mgr/modify`,
    method: 'put',
    data
  })
}
// 风险等级标准 del
export const delRiskLevelStandard = (id) => {
  return request({
    url: `/info_mgr/risk_value_standard_mgr/delete/${id}`,
    method: 'delete'
  })
}