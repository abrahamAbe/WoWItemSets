//add global interfaces here

export interface ItemSet{
    name: string
    id: number
    effects: Array<{ display_string: string }>
    items: Array<{ name: string, id: number }>
}

export interface ItemSets{
    item_sets: Array<ItemSet>
}

interface ColoredString{
    display: { 
        display_string: string 
        color: { r: number, g: number, b: number, a: number } 
    }
}

export interface SetItem{
    name: string
    id: number
    purchase_price: number
    sell_price : number
    preview_item: {
        stats: Array<ColoredString>
        quality: { name: string }
        requirements: {
            level: {
                display_string: string
            }
        }
        armor: ColoredString
        item_class: { name: string }
        item_subclass: { name: string }
        inventory_type: {
            name: string
        }
        durability: {
            display_string: string
        }
        level: {
            display_string: string
        },
        set: {
            item_set: {
                id: number
            }
        }
    }
}

export interface ItemMedia{
    id: number
    assets: Array<{ value: string }>
}

export interface ImagesHash {
    [key: string]: ItemMedia
}

export interface SagaAction{
    type: string
    payload?: any  
}

export interface CacheObject{
    data: any
    expiryDate: number | null
}

export interface CacheHash{
    [key: string]: CacheObject
}

export interface Headers{
    'cache-control': string
    'content-type': string
    'last-modified': string
}

export interface HttpResponse{
    config?: unknown
    data?: any
    headers?: Headers
    request?: unknown
    status?: number
    statusText?: string
}

export interface DataObject {
    grant_type: string
}

export interface AuthObject {
    username: string | undefined
    password: string | undefined
}

export interface OptionsObject {
    method?: any
    headers?: any
    data?: unknown
    auth?: any
    url?: any
}

export interface HttpRequestObj{
    url: string
    requestData: any
}