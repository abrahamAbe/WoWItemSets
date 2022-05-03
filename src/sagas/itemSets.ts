import { take, put, takeEvery } from 'typed-redux-saga'
import { getItemSetsFetch, getItemSetsSuccess, getItemSetsFailure, getItemSetFetch, getItemSetSuccess, getItemSetFailure, getItemMediaFetch, getItemMediaSuccess, getItemMediaFailure, 
    getSetItemFetch, getSetItemSuccess, getSetItemFailure, setDataInCache, removeDataFromCache, testFunc } from '../state/itemSetsSlice'
import { getCachedData } from '../util/utilFunctions'
import { HttpResponse, ItemSets, SagaAction, ItemSet, SetItem, ItemMedia } from '../models/modelObjects'
import { httpClient } from '../api/httpClient'
import { getAPIMaxAge, getAPIExpiryDate, buildRequestUrl } from '../util/utilFunctions'


export function* testSaga(){
    yield take(testFunc.type)
}

//get item sets array
function* getItemSets(action: SagaAction){
    const data: ItemSets | null = yield getCachedData(action.payload)

    if(data){
        yield put(getItemSetsSuccess(data))
    }
    else{
        try{
            const response: HttpResponse = yield httpClient.get(action.payload)
            yield put(removeDataFromCache(action.payload))
            yield put(setDataInCache({ key: action.payload, expiryDate: getAPIExpiryDate(getAPIMaxAge(response.headers)), data: response.data }))
            yield put(getItemSetsSuccess(response.data))
        }
        catch(e: unknown){
            yield put(
                getItemSetsFailure()
            )
        }
    }
}

//setting watcher
export function* getItemSetsSaga(){
    yield takeEvery(getItemSetsFetch.type, getItemSets)
}

//get single item set
function* getItemSet(action: SagaAction){
    const requestUrl: string = yield buildRequestUrl(action.payload)

    const data: ItemSet | null = yield getCachedData(requestUrl)

    if(data){
        yield put(getItemSetSuccess(data))
    }
    else{
        try{
            const response: HttpResponse = yield httpClient.get(requestUrl)

            yield put(removeDataFromCache(requestUrl))
            yield put(setDataInCache({ key: requestUrl, expiryDate: getAPIExpiryDate(getAPIMaxAge(response.headers)), data: response.data }))
            yield put(getItemSetSuccess(response.data))
        }
        catch(e: unknown){
            yield put(
                getItemSetFailure()
            )
        }
    }
}

//setting watcher
export function* getItemSetSaga(){
    yield takeEvery(getItemSetFetch.type, getItemSet)
}

//get SetItem
function* getSetItem(action: SagaAction){
    
    const requestUrl: string = yield buildRequestUrl(action.payload)

    const data: SetItem | null = yield getCachedData(requestUrl)

    if(data){
        yield put(getSetItemSuccess(data))
    }
    else{
        try{
            const response: HttpResponse = yield httpClient.get(requestUrl)

            yield put(removeDataFromCache(requestUrl))
            yield put(setDataInCache({ key: requestUrl, expiryDate: getAPIExpiryDate(getAPIMaxAge(response.headers)), data: response.data }))
            yield put(getSetItemSuccess(response.data))
        }
        catch(e: unknown){
            yield put(
                getSetItemFailure()
            )
        }
    }
}

//setting watcher
export function* getSetItemSaga(){
    yield takeEvery(getSetItemFetch.type, getSetItem)
}

//get item media
function* getItemMedia(action: SagaAction){
    const requestUrl: string = yield buildRequestUrl(action.payload)

    const data: ItemMedia | null = yield getCachedData(requestUrl)

    if(data){
        yield put(getItemMediaSuccess(data))
    }
    else{
        try{
            const response: HttpResponse = yield httpClient.get(requestUrl)

            yield put(removeDataFromCache(requestUrl))
            yield put(setDataInCache({ key: requestUrl, expiryDate: getAPIExpiryDate(getAPIMaxAge(response.headers)), data: response.data }))
            yield put(getItemMediaSuccess(response.data))
        }
        catch(e: unknown){
            yield put(
                getItemMediaFailure()
            )
        }
    }
}

//setting watcher
export function* getItemMediaSaga(){
    yield takeEvery(getItemMediaFetch.type, getItemMedia)
}