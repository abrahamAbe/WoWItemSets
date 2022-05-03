import React from 'react'
import { Link } from 'react-router-dom'

import { ItemSet } from '../models/modelObjects'

import { useAppDispatch } from '../state/stateHooks'
import { deleteCurrentItemSet, deleteItemImages } from '../state/itemSetsSlice'

import styled from 'styled-components'
import FlexContainer from '../styles/components/FlexContainer'

import Pagination from '../components/Pagination'

const ScreenContent = styled(FlexContainer)`
    flex-direction: column;
    align-items: center;
`

interface ItemSetLinkProps{
    itemindex: number
}

const ItemSetLink = styled(Link)<ItemSetLinkProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ props => props.theme.colors.black };
    color: ${ props => props.theme.colors.lightGray };
    border: 1px solid ${ props => props.theme.colors.lightGray };
    //only render top border on the first item
    border-top: ${ props => props.itemindex > 0 ? 'none' : '' };
    height: 2.7rem;
    min-width: 18.75rem;

    &:hover{
        background-color: ${ props => props.theme.colors.darkGray };
        color: ${ props => props.theme.colors.white };
    }
`

interface Props{
    itemSets: Array<ItemSet>,
    itemSetsPerPage: number,
    totalItemSets: number,
    paginate(searchValue: number): void,
    currentPage: number
}

const ItemSets:React.FC<Props> = (props: Props) => {

    const dispatch = useAppDispatch()

    return (
        <>
            <ScreenContent>
                {
                    props.itemSets.map((itemSet, index) =>
                        <ItemSetLink key={ index } itemindex={ index } onClick={ () => { dispatch(deleteCurrentItemSet()); dispatch(deleteItemImages()) } } to={`/itemSet/${itemSet.id}`}>
                            { itemSet.name }
                        </ItemSetLink>
                    )
                }

                <Pagination itemSetsPerPage={ props.itemSetsPerPage } totalItemSets={ props.totalItemSets } paginate={ props.paginate } currentPage={ props.currentPage }></Pagination>
            </ScreenContent>
        </>
    )
}

export default ItemSets