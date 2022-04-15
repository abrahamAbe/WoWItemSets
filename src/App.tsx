import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './state/stateHooks'

import { getItemSetsFetch } from './state/itemSetsSlice'
import { getOauthToken, getOauthTokenOptions } from './api/oauth'
import { itemSetsIndexEndpoint } from './api/endpoints'

import Home from './screens/Home'
import ItemSet from './screens/ItemSet'
import Item from './screens/Item'

import GlobalStyles from './styles/GlobalStyles'
import ScreenContainer from './styles/components/ScreenContainer'

const App:React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')

        //get auth token if there isn't one
        if(!authToken){
            getOauthToken(getOauthTokenOptions).then(response => {
                localStorage.setItem('authToken', response.data.access_token)
                dispatch(getItemSetsFetch(itemSetsIndexEndpoint))
            })
            .catch(error => { //add action here and set error on state
                //dispatch({ type: 'SET_HTTP_ERROR', payload: error.response.statusText })
            })
        }
        else{
            dispatch(getItemSetsFetch(itemSetsIndexEndpoint))
        }
        //localStorage.clear()

    }, [])

    return (
        <>
            <GlobalStyles />

            <ScreenContainer>
                {/*<div onClick={ () => dispatch(getItemSetsFetch(itemSetsIndexEndpoint)) }>click</div>

                <Link to='/'>Home</Link>
                <Link to='/itemSet/:id'>ItemSet</Link>
                <Link to='/item/:id'>Item</Link>*/}

                {/* add screens here */}
                <Routes>
                    <Route path='/' element={ <Home/> } />
                    <Route path='itemSet/:id' element={ <ItemSet /> } />
                    <Route path='item/:id' element={ <Item /> } />
                </Routes>
            </ScreenContainer>
        </>
    )
}

export default App