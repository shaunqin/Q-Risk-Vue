import request from '@/utils/request'

// 产品系统分页列表
export const queryProdList = (params) => {
    return request({
      url: `/info_mgr/prod_mgr/query/pageList/${params.pageNum}/${params.pageSize}`,
      method: 'get',
      params
    })
  }
  