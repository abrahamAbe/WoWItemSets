import React, { useEffect } from 'react'

import { RootState } from '../state/store'
import { useAppSelector, useAppDispatch } from '../state/stateHooks'
import { getSetItemFetch } from '../state/itemSetsSlice'
import { setItemEndpoint } from '../api/endpoints'

import { useParams } from 'react-router-dom'

import { HttpRequestObj } from '../models/modelObjects'

import styled from 'styled-components'
import FlexContainer from '../styles/components/FlexContainer'

import ItemImage from '../components/ItemImage'
import NavigationLink from '../components/NavigationLink'

const LoadingSpinner = styled(FlexContainer)`
    display: flex;
    justify-content: center;
`

const TitleAndImageContainer = styled(FlexContainer)`
    flex-direction: column;
    align-items: center;
`

const ScreenTitle = styled.div`
    font-size: 1.6rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
`

const ScreenGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 23.4rem); //setting section width
    justify-content: center;
`

const SectionContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    align-items: center;
`

const SectionTitle = styled.div`
    font-size: 1.3rem;
    margin-bottom: 1rem;
`

interface SetItemColoredTextProps{
    colorObject: { r: number, g: number, b: number, a: number }
}

const SetItemColoredText = styled.div<SetItemColoredTextProps>`
    margin-bottom: 1rem;
    color: rgba(${ props => props.colorObject.r }, ${ props => props.colorObject.g }, ${ props => props.colorObject.b }, ${ props => props.colorObject.a });
`

const SetItemText = styled.div`
    margin-bottom: 1rem;
    color: ${ props => props.theme.colors.lightGray };
`

const SetItem:React.FC = () => {

    const { itemId } = useParams(),
        dispatch = useAppDispatch(),
        setItem = useAppSelector((state: RootState) => state.itemSets.currentSetItem),
        loading = useAppSelector((state: RootState) => state.itemSets.loading)

    const requestObj: HttpRequestObj = {
        url: setItemEndpoint,
        requestData: {
            itemId: itemId
        }
    }

    useEffect(() => {
        dispatch(getSetItemFetch(requestObj))
    }, [])

    return (
        <>
            {
                loading ? <LoadingSpinner>{ '... loading' }</LoadingSpinner> :

                <>
                    <TitleAndImageContainer>
                        <ScreenTitle>{ setItem.name }</ScreenTitle>

                        <ItemImage itemId={ setItem.id }></ItemImage>
                    </TitleAndImageContainer>

                    <ScreenGrid>

                        <SectionContent>
                            <SectionTitle>Stats</SectionTitle>
                            {
                                setItem.preview_item.stats ? setItem.preview_item.stats.map((stat, index) => <SetItemColoredText key={ index } colorObject={ stat.display.color }>{ stat.display.display_string }</SetItemColoredText>) : <SetItemText>No info to show</SetItemText>
                            }
                        </SectionContent>

                        <SectionContent>
                            <SectionTitle>Item Details</SectionTitle>
                            {
                                setItem.preview_item.quality ? <SetItemText>Quality: { setItem.preview_item.quality.name }</SetItemText> : <></>  
                            }
                            {
                                setItem.preview_item.level ? <SetItemText>{ setItem.preview_item.level.display_string }</SetItemText> : <></>  
                            }
                            {
                                setItem.preview_item.requirements ? <SetItemText>{ setItem.preview_item.requirements.level.display_string }</SetItemText> : <></>
                            }
                            {
                                setItem.preview_item.item_class ? <SetItemText>Class: { setItem.preview_item.item_class.name }</SetItemText> : <></>
                            }
                            {
                                setItem.preview_item.item_subclass ? <SetItemText>Sub Class: { setItem.preview_item.item_subclass.name }</SetItemText> : <></>
                            }
                            {
                                setItem.preview_item.inventory_type ? <SetItemText>Inventory Type: { setItem.preview_item.inventory_type.name }</SetItemText> : <></>
                            }
                            {
                                setItem.preview_item.durability ? <SetItemText>{ setItem.preview_item.durability.display_string }</SetItemText> : <></>
                            }
                            {  
                                setItem.preview_item.armor ? <SetItemColoredText colorObject={ setItem.preview_item.armor.display.color }>{ setItem.preview_item.armor.display.display_string }</SetItemColoredText> : <></>
                            }
                        </SectionContent>

                        <SectionContent>
                            <SectionTitle>Item Value</SectionTitle>
                            {
                                setItem.purchase_price ? <SetItemText>Purchase price: { setItem.purchase_price }</SetItemText> : <></>
                            }
                            {
                                setItem.sell_price ? <SetItemText>Sell price: { setItem.sell_price }</SetItemText> : <></>
                            }
                        </SectionContent>

                    </ScreenGrid>

                    <NavigationLink routeString={ 'itemSet/' + setItem.preview_item.set.item_set.id } ></NavigationLink>
                </>
            }
        </>
    )
}

export default SetItem