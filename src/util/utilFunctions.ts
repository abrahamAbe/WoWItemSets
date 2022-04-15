import { store } from '../state/store'
import { Headers } from '../models/modelObjects'

/*  takes a string key and checks if it exists in the cache
    if it doesn't, it returns null
    if the key exists in the cache, it checks that the current date is less than the cache's expiry date
    if the current date is less than the cache's expiry date, it return the cached data 
    if the current date is greater than the cache's expiry date, or if there is no cache's expiry date, it returns null */
const getCachedData = (key: string) => {
    const cache = store.getState().itemSets.cache,
        cacheObj = cache[key] ? cache[key] : null

    if(!cacheObj) return null
    if(!cacheObj.expiryDate) return null

    const currentDate = new Date().getTime(),
        cacheExpiryDate = new Date(cacheObj.expiryDate).getTime()

    return currentDate < cacheExpiryDate ? cacheObj.data : null
}

//checks for an API's max age header, if the value exists it converts it to milliseconds and returns it, if it doesn't it returns 0
const getAPIMaxAge = (headers?: Headers) => {
    const regexMatch = headers ? headers['cache-control'].match(/max-age=(\d+)/) : null

    const maxAge = regexMatch ? parseInt(regexMatch[1]) : null

    return maxAge ? maxAge * 1000 : 0
}

/* generates a cache expiry date based on an API's max age header value 
   if the maxAge is equal to zero it returns null*/
const getAPIExpiryDate = (maxAge: number) => {
    return maxAge > 0 ? new Date().getTime() + maxAge : null
}

export { getCachedData, getAPIMaxAge, getAPIExpiryDate }