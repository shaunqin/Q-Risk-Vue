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