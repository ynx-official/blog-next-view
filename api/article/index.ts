import { getReq } from "@/utils/request"
export const getArticlePage = (data: any): Promise<any> =>
   getReq(`blog/article/list`, data)

export const getArticleById = (articleId: number): Promise<any> =>
   getReq(`blog/article/${articleId}`)
export const getSearchByKeyword = (data: any): Promise<any> =>
   getReq(`v1/article/search`, data)
export const getArticleDetail = (data: any): Promise<any> =>
   getReq(`v1/article/detail`, data)
export const getArticleStatistics = (data: any): Promise<any> =>
   getReq(`v1/article/statistics`, data)
