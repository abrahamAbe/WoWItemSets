import { take, put, takeEvery } from 'redux-saga/effects'
import { getItemSetsFetch, getItemSetsSuccess, getItemSetsFailure, setDataInCache, removeDataFromCache, testFunc } from '../state/itemSetsSlice'
import { getCachedData } from '../util/utilFunctions'
import { Action, HttpResponse } from '../models/modelObjects'
import { httpClient } from '../api/httpClient'
import { getAPIMaxAge, getAPIExpiryDate } from '../util/utilFunctions'


export function* testSaga(){
    yield take(testFunc.type)
}

function* getItemSets(action: Action){
    const data = getCachedData(action.payload)

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