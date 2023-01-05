import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { RootState } from '../state/store'
import { useAppSelector, useAppDispatch } from '../state/stateHooks'
import { getItemSetFetch, deleteCurrentSetItem } from '../state/itemSetsSlice'
import { itemSetEndpoint } from '../api/endpoints'

import { HttpRequestObj } from '../models/modelObjects'
 
import styled from 'styled-components'
import FlexContainer from '../styles/components/FlexContainer'

import ItemImage from '../components/ItemImage'
import NavigationLink from '../components/NavigationLink'

const LoadingSpinner = styled(FlexContainer)`
    display: flex;
    justify-content: center;
`

const ScreenContent = styled(FlexContainer)`
    flex-direction: column;
    align-items: center;
`

const ScreenTitle = styled.div`
    font-size: 1.6rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
`

interface SectionProps{
    alignCenter?: boolean
}

const Section = styled.div<SectionProps>`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    align-items: ${ props => props.alignCenter ? 'center' : '' };
`

const SectionTitle = styled.div`
    align-self: center;
    font-size: 1.3rem;
    margin-bottom: 1rem;
`

const ItemSetEffect = styled.div`
    margin-bottom: 1rem;
    color: ${ props => props.theme.colors.lightGray };
`

const ItemContainer = styled(Link)`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    cursor: pointer;
`

const ItemText = styled.div`
    margin-left: 1rem;
    color: ${ props => props.theme.colors.lightGray };

    &:hover{
        background-color: ${ props => props.theme.colors.black };
        color: ${ props => props.theme.colors.white };
    }
`

const ItemSet:React.FC = () => {

    const { itemSetId } = useParams(),//gets the current itemSet id from the url
        dispatch = useAppDispatch(),
        itemSet = useAppSelector((state: RootState) => state.itemSets.currentItemSet),
        loading = useAppSelector((state: RootState) => state.itemSets.loading)
        
    const requestObj: HttpRequestObj = {
        url: itemSetEndpoint,
        requestData: {
            itemSetId: itemSetId
        }
    }

    useEffect(() => {
        dispatch(getItemSetFetch(requestObj))
    }, [])

    return (
        <>
            {
                loading ? <LoadingSpinner>{ '... loading' }</LoadingSpinner> :

                <ScreenContent>

                    <ScreenTitle>{ itemSet.name }</ScreenTitle>

                    <Section alignCenter={ true }>
                        <SectionTitle>Effects</SectionTitle>
                        {
                            itemSet.effects.map((itemSet, index) =>
                                <ItemSetEffect key={ index }>{ itemSet.display_string }</ItemSetEffect>
                            )
                        }
                    </Section>

                    <Section>
                        <SectionTitle>Items</SectionTitle>
                            {
                                itemSet.items.map((item, index) =>
                                    <ItemContainer key={ index } to={`/item/${item.id}`} onClick={ () => dispatch(deleteCurrentSetItem()) }>
                                        <ItemImage itemId={ item.id }></ItemImage> <ItemText>{ item.name }</ItemText>
                                    </ItemContainer>
                                )
                            }
                    </Section>

                    <NavigationLink routeString={''}></NavigationLink>

                </ScreenContent>
            }
        </>
    )
}

export default ItemSet