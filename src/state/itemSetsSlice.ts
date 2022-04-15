import { createSlice, Dictionary } from '@reduxjs/toolkit'
import { ItemSet, CacheObject } from '../models/modelObjects'

//defining slice's initial state
interface ItemSetsState{
    itemSetsArray: Array<ItemSet>,
    loading: boolean,
    fulfilled: boolean,
    rejected: boolean,
    cache: Dictionary<CacheObject>,
    testArray: Array<ItemSet>
}

const initialState: ItemSetsState = {
    itemSetsArray: [],
    loading: false,
    fulfilled: false,
    rejected: false,
    cache: {},
    testArray: []
}

export const itemSetsSlice = createSlice({
    name: 'itemSets',
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItemSetsFetch: (state: ItemSetsState, _action) => { // we want to access this action in sagas/itemSets.ts so we have to pass it here, even though it's not being used in the reducer
            state.loading = true
        },
        getItemSetsSuccess: (state: ItemSetsState, action) => {
            state.itemSetsArray = action.payload
            state.loading = false
        },
        getItemSetsFailure: (state: ItemSetsState) => {
            state.rejected = true
            state.loading = false
        },
        //uses endpoint url's as cache keys
        setDataInCache: (state: ItemSetsState, action) => {
            state.cache[action.payload.key] = { data: action.payload.data, expiryDate: action.payload.expiryDate }
        },
        removeDataFromCache: (state: ItemSetsState, action) => {
            delete state.cache[action.payload]
        },
        testFunc: (state: ItemSetsState, action) => {
            state.testArray = action.payload
        }
    }
})

//action creators are generated for each case reducer function
export const { getItemSetsFetch, getItemSetsSuccess, getItemSetsFailure, setDataInCache, removeDataFromCache, testFunc } = itemSetsSlice.actions

export default itemSetsSlice.reducer