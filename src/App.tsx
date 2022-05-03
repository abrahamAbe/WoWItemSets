import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './state/stateHooks'
import { RootState } from './state/store'
import { ItemSet as ItemSetInterface } from './models/modelObjects'

import { getItemSetsFetch } from './state/itemSetsSlice'
import { getOauthToken, getOauthTokenOptions } from './api/oauth'
import { itemSetsIndexEndpoint } from './api/endpoints'

import ItemSets from './screens/ItemSets'
import ItemSet from './screens/ItemSet'
import SetItem from './screens/SetItem'

import GlobalStyles from './styles/GlobalStyles'
import AppContent from './styles/components/AppContent'

import Search from './components/Search'
import Header from './components/Header'

const App:React.FC = () => {
    const dispatch = useAppDispatch(),
        //itemSets pulled from Blizzard's APIs
        itemSetsData = useAppSelector((state: RootState) => state.itemSets.itemSetsData)

    //creating local state to store item set search results and handle pagination
    const [filteredItemSetsData, setFilteredItemSetsData] = useState<ItemSetInterface[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemSetsPerPage] = useState<number>(15)

    //gets an array of item sets based on the user's input and stores it in the local state
    const search = (searchValue: string): void => {
        const filteredItemSetsData: Array<ItemSetInterface> | [] = itemSetsData.item_sets.filter(itemSet => {
            return itemSet.name.toLowerCase().includes(searchValue.toLowerCase())
        })

        setFilteredItemSetsData(filteredItemSetsData)
    }

    //get current itemSets
    const indexOfLastItemSet: number = currentPage * itemSetsPerPage
    const indexOfFirstItemSet: number = indexOfLastItemSet - itemSetsPerPage
    const currentItemSets: Array<ItemSetInterface> | [] = filteredItemSetsData.slice(indexOfFirstItemSet, indexOfLastItemSet)

    //change page
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)

    useEffect(() => {
        const authToken: string | null = localStorage.getItem('authToken')

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

    //display first 15 item sets on page load
    useEffect(() => {
        setFilteredItemSetsData(itemSetsData.item_sets.slice(0, 15))
    }, [itemSetsData])

    return (
        <>
            <GlobalStyles />

            <Header></Header>

            <AppContent>
                
                <Search search={ search } paginate={ paginate }></Search>
                
                {/* add screens here */}
                <Routes>
                    <Route path='/' element={ <ItemSets itemSets={ currentItemSets } itemSetsPerPage={ itemSetsPerPage } totalItemSets={ filteredItemSetsData.length } paginate={ paginate } currentPage={ currentPage }/> } />
                    <Route path='itemSet/:itemSetId' element={ <ItemSet /> } />
                    <Route path='item/:itemId' element={ <SetItem /> } />
                </Routes>
            </AppContent>
        </>
    )
}

export default App