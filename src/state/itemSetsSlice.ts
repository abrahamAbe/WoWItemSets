import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { ItemSets, ItemSet, CacheHash, HttpRequestObj, ImagesHash, SetItem, ItemMedia } from '../models/modelObjects'

//defining slice's initial state
interface ItemSetsState{
    itemSetsData: ItemSets,
    currentItemSet: ItemSet,
    currentSetItem: SetItem,
    itemImages: ImagesHash,
    loading: boolean,
    fulfilled: boolean,
    rejected: boolean,
    cache: CacheHash,
    testSetsData: ItemSets
}

const currentSetItem = { 
    name: '', 
    id: 0,
    purchase_price: 0,
    sell_price : 0,
    preview_item: { 
        stats: [], 
        quality: { name: '' }, 
        requirements: { 
            level: { 
                display_string: '' 
            } 
        }, 
        armor: { 
            display: { 
                display_string: '', 
                color: { r: 0, g: 0, b: 0, a: 0 } 
            } 
        },
        item_class: { name: '' },
        item_subclass: { name: '' },
        inventory_type: {
            name: ''
        },
        durability: {
            display_string: ''
        },
        level: {
            display_string: ''
        },
        set: {
            item_set: {
                id: 0
            }
        } 
    } 
}

const initialState: ItemSetsState = {
    itemSetsData: { item_sets: [] },
    currentItemSet: { name: '', id: 0, effects: [], items: [] },
    currentSetItem: currentSetItem,
    itemImages: {},
    loading: false,
    fulfilled: false,
    rejected: false,
    cache: {},
    testSetsData: { item_sets: [] }
}

interface SetDataInCacheAction{
    key: string,
    data: unknown,
    expiryDate: number | null
}

export const itemSetsSlice = createSlice({
    name: 'itemSets',
    initialState,
    reducers: {
        // get item sets logic (array)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItemSetsFetch: (state: ItemSetsState, _action: PayloadAction<string>): void => { // we want to access this action in sagas/itemSets.ts so we have to pass it here, even though it's not being used in the reducer
            state.loading = true
        },
        getItemSetsSuccess: (state: ItemSetsState, action: PayloadAction<ItemSets>): void => {
            state.itemSetsData = action.payload
            state.loading = false
        },
        getItemSetsFailure: (state: ItemSetsState): void => {
            state.rejected = true
            state.loading = false
        },

        // get item set logic (object)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItemSetFetch: (state: ItemSetsState, _action: PayloadAction<HttpRequestObj>): void => {
            state.loading = true
        },
        getItemSetSuccess: (state: ItemSetsState, action: PayloadAction<ItemSet>): void => {
            state.currentItemSet = action.payload
            state.loading = false
        },
        getItemSetFailure: (state: ItemSetsState): void => {
            state.rejected = true
            state.loading = false
        },
        deleteCurrentItemSet: (state: ItemSetsState): void => {
            state.loading = true
            state.currentItemSet = { name: '', id: 0, effects: [], items: [] }
        },

        // get item logic
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getSetItemFetch: (state: ItemSetsState, _action: PayloadAction<HttpRequestObj>): void => {
            state.loading = true
        },
        getSetItemSuccess: (state: ItemSetsState, action: PayloadAction<SetItem>): void => {
            state.currentSetItem = action.payload
            state.loading = false
        },
        getSetItemFailure: (state: ItemSetsState): void => {
            state.rejected = true
            state.loading = false
        },
        deleteCurrentSetItem: (state: ItemSetsState): void => {
            state.loading = true
            state.currentSetItem = currentSetItem
        },

        // get item media logic
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItemMediaFetch: (_state: ItemSetsState, _action: PayloadAction<HttpRequestObj>): void => {
            //state.loading = true
        },
        getItemMediaSuccess: (state: ItemSetsState, action: PayloadAction<ItemMedia>): void => {
            state.itemImages[action.payload.id] = action.payload
            //state.loading = false
        },
        getItemMediaFailure: (state: ItemSetsState): void => {
            state.rejected = true
            state.loading = false
        },
        deleteItemImages: (state: ItemSetsState): void => {
            state.itemImages = {}
        },

        //uses endpoint url's as cache keys
        setDataInCache: (state: ItemSetsState, action: PayloadAction<SetDataInCacheAction>): void => {
            state.cache[action.payload.key] = { data: action.payload.data, expiryDate: action.payload.expiryDate }
        },
        removeDataFromCache: (state: ItemSetsState, action: PayloadAction<string>): void => {
            delete state.cache[action.payload]
        },

        testFunc: (state: ItemSetsState, action): void => {
            state.testSetsData = action.payload
        }
    }
})

//action creators are generated for each case reducer function
export const { getItemSetsFetch, getItemSetsSuccess, getItemSetsFailure, getItemSetFetch, getItemSetSuccess, getItemSetFailure, deleteCurrentItemSet, getSetItemFetch, getSetItemSuccess, getSetItemFailure, deleteCurrentSetItem,
    getItemMediaFetch, getItemMediaSuccess, getItemMediaFailure, deleteItemImages, setDataInCache, removeDataFromCache, testFunc } = itemSetsSlice.actions

export default itemSetsSlice.reducer