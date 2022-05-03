import React, { useEffect }  from 'react'

import { useAppDispatch, useAppSelector } from '../state/stateHooks'
import { getItemMediaFetch } from '../state/itemSetsSlice'
import { RootState } from '../state/store'

import { HttpRequestObj } from '../models/modelObjects'

import { itemMediaEndpoint } from '../api/endpoints'

import styled from 'styled-components'

const ImageContainer = styled.div`
    min-height: 3.7rem;
    min-width: 3.7rem;
`

interface Props{
    itemId: number
}

const ItemImage:React.FC<Props> = (props: Props) => {

    const dispatch = useAppDispatch(),
        itemImageAddress = useAppSelector((state: RootState) => state.itemSets.itemImages[props.itemId] ? state.itemSets.itemImages[props.itemId].assets[0].value : '')

    const requestObj: HttpRequestObj = {
        url: itemMediaEndpoint,
        requestData: {
            itemId: props.itemId
        }
    }

    useEffect(() => {
        if(props.itemId){
            dispatch(getItemMediaFetch(requestObj))
        }
    }, [props.itemId])
    

    return (
        <ImageContainer>
            <img src={ itemImageAddress }/>
        </ImageContainer>
    )
}

export default ItemImage