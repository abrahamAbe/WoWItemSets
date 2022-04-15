export interface ItemSet{
    name: string
    id: number
}

export interface Action{
    type: string,
    payload?: any  
}

export interface CacheObject{
    data: any,
    expiryDate: number
}

export interface Headers{
    'cache-control': string,
    'content-type': string
    'last-modified': string
}

export interface HttpResponse{
    config?: unknown,
    data?: unknown,
    headers?: Headers,
    request?: unknown,
    status?: number,
    statusText?: string
}

export interface DataObject {
    grant_type: string
}

export interface AuthObject {
    username: string,
    password: string
}

export interface OptionsObject {
    method?: any,
    headers?: any,
    data?: any,
    auth?: any,
    url?: any
}