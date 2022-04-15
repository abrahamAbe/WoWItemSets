import { all, fork } from 'redux-saga/effects'

import * as itemSetsSagas from './itemSets'

export default function* rootSaga(){
    yield all(
        [...Object.values(itemSetsSagas)].map(fork)
    )
}