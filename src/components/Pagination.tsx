import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`

const PaginationContent = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 25rem;
`

interface PaginationItemProps{
    selected: boolean
}

const PaginationItem = styled.div<PaginationItemProps>`
    height: 1.8rem;
    width: 1.8rem;
    background-color: ${ props => props.selected ? props.theme.colors.overlayBlue : props.theme.colors.blue };
    color: ${ props => props.selected ? props.theme.colors.black : props.theme.colors.white };
    margin-right: .7rem;
    margin-bottom: .7rem;
    cursor: pointer;
    border: 1px solid ${ props => props.theme.colors.black };
    border-radius: .3rem;
    text-align: center;
    padding-top: .3rem;

    &:hover{
        background-color: ${ props => props.selected ? '' : props.theme.colors.lightBlue };
    }
`

interface Props{
    itemSetsPerPage: number,
    totalItemSets: number,
    paginate(searchValue: number): void,
    currentPage: number
}

const Pagination:React.FC<Props> = (props: Props) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalItemSets / props.itemSetsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <PaginationContainer>
                <PaginationContent>
                    { 
                        /*only show pagination grid if there are at least two pages */
                        pageNumbers.length > 1 ? pageNumbers.map(number => (
                            <PaginationItem key={ number } selected={ number === props.currentPage } onClick={ () => props.paginate(number) }>
                                { number }
                            </PaginationItem>
                        )) : <></>
                    }
                </PaginationContent>
            </PaginationContainer>
        </>
    )
}

export default Pagination