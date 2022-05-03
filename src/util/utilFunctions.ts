import { store } from '../state/store'
import { Headers, CacheHash, HttpRequestObj } from '../models/modelObjects'

/*  takes a string key and checks if it exists in the cache
    if it doesn't, it returns null
    if the key exists in the cache, it checks that the current date is less than the cache's expiry date
    if the current date is less than the cache's expiry date, it return the cached data 
    if the current date is greater than the cache's expiry date, or if there is no cache's expiry date, it returns null */
const getCachedData = (key: string): object | null => {
    const cache: CacheHash = store.getState().itemSets.cache,
        cacheObj = cache[key] ? cache[key] : null

    if(!cacheObj) return null
    if(!cacheObj.expiryDate) return null

    const currentDate: number = new Date().getTime(),
        cacheExpiryDate: number = new Date(cacheObj.expiryDate).getTime()

    return currentDate < cacheExpiryDate ? cacheObj.data : null
}

//checks for an API's max age header, if the value exists it converts it to milliseconds and returns it, if it doesn't it returns 0
const getAPIMaxAge = (headers?: Headers): number => {
    const regexMatch: RegExpMatchArray | null = headers ? headers['cache-control'].match(/max-age=(\d+)/) : null

    const maxAge: number | null = regexMatch ? parseInt(regexMatch[1]) : null

    return maxAge ? maxAge * 1000 : 0
}

/* generates a cache expiry date based on an API's max age header value 
   if the maxAge is equal to zero it returns null*/
const getAPIExpiryDate = (maxAge: number): number | null => {
    return maxAge > 0 ? new Date().getTime() + maxAge : null
}

//takes a url and replaces it's keys with  values pulled from the requestData object. Only use if url has keys in it
const buildRequestUrl = (requestObj: HttpRequestObj): string => {
    if (!requestObj.requestData) return ''

    let requestUrl: string = requestObj.url
    
    Object.entries(requestObj.requestData)
    .forEach(([key, value]) => requestUrl = requestUrl.replace('{' + `${key}` + '}', `${value}`))

    return requestUrl
}

export { getCachedData, getAPIMaxAge, getAPIExpiryDate, buildRequestUrl }