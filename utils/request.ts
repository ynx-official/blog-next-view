import { hash } from 'ohash'
import process from "node:process";

const fetch = async (url: string, options?: any, headers?: any) => {

  try {
    // 你的接口地址
    const reqUrl = process.env.VITE_BASE_URL + url
    console.log("[请求地址]: "+reqUrl)

    // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
    const key = hash(options + url)
    // 可以设置默认headers例如
    const customHeaders = { token: useCookie('token').value, ...headers }

    const { data, error } = await useFetch(reqUrl, { ...options, key, headers: customHeaders })

    const result = data.value as any

    console.log("[请求结果]: ", result);

    if (result?.code !== 0) {
      throw createError({
        statusCode: 500,
        statusMessage: reqUrl,
        message: error?.value?.message || '服务器内部错误',
      })
    }
    return result
  } catch (err) {
    console.log("[请求异常]: ", err);
    return Promise.reject(err)
  }

}

export const getReq = (url: string, params?: any, headers?: any) => {
  return fetch(url, { method: 'get', params }, headers)
}

export const postReq = (url: string, params?: any, headers?: any) => {
  return fetch(url, { method: 'post', body: params }, headers)
}

export const putReq = (url: string, params?: any, headers?: any) => {
  return fetch(url, { method: 'put', body: params }, headers)
}

export const delReq = (url: string, params?: any, headers?: any) => {
  return fetch(url, { method: 'delete', params }, headers)
}
