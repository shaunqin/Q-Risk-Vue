import request from '@/utils/request'

export function initData(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

// 获取数据:质量审核|外部检查|监督检查|安全自查
export const querySuperviseMgrList = (params) => {
  return request({
      url: '/info_mgr/supervise_mgr/query/list',
      method: 'get',
      params
  })
}