import { getReq, postReq } from "@/utils/request"
export const getMenuInfo = (data: any): Promise<any> =>
   getReq(`blog/article/list`, data)
export const getSearchByKeyword = (data: any): Promise<any> =>
   getReq(`v1/article/search`, data)
export const getArticleDetail = (data: any): Promise<any> =>
   getReq(`v1/article/detail`, data)
export const getArticleStatistics = (data: any): Promise<any> =>
   getReq(`v1/article/statistics`, data)
