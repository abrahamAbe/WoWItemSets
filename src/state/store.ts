import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'

//import reducers here
import itemSetsReducer from './itemSetsSlice'

//redux saga setup
import rootSaga from '../sagas'
const sagaMiddleWare = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        itemSets: itemSetsReducer
    },
    // adding the api middleware enables caching, invalidation, polling,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, 
            serializableCheck: false
        }).concat(sagaMiddleWare)
})

sagaMiddleWare.run(rootSaga)

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// inferred type: {itemSets: itemSetsReducer}
export type AppDispatch = typeof store.dispatch

//gives us global access to the store
export default store