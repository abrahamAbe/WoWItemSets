import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const SearchBarContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;

    @media (max-width: ${ props => props.theme.dimensions.mobileLg }) {
        justify-content: center;
    }
`

const SearchBarContent = styled.div`
    display: flex;
    max-width: 19rem;
`

const SearchBar = styled.input`
    height: 2.5rem;
    width: 13.5rem;
    font-size: 1rem;
`

const SearchButton = styled.input`
    height: 2.5rem;
    padding: 0 1rem 0 1rem;
    color: ${ props => props.theme.colors.white };
    background-color: ${ props => props.theme.colors.blue };
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover{
        background-color: ${ props => props.theme.colors.lightBlue };
    }
`

interface Props{
    search(searchValue: string): void,
    paginate(searchValue: number): void
}

const Search:React.FC<Props> = (props: Props) => {
    const [searchValue, setSearchValue] = useState(''),
        navigate = useNavigate()

    const handleSearchInputChanges = (e: any): void => {
        setSearchValue(e.target.value)
    }

    //sets the input field to an empty string after pressing enter or the search button
    const resetInputField = (): void => {
        setSearchValue('')
    }

    //calls the search function when user presses enter or the search button
    const callSearchFunction = (e: any): void => {
        e.preventDefault()
        if(searchValue){
            props.search(searchValue)
            //resets to page 1 when doing a new search
            props.paginate(1)
            //navigates back to the search results page after pressing enter or the search button
            navigate('/')
        }
        resetInputField()
    }

    //triggers the search function as user types in the search bar
    useEffect(() => {
        if(searchValue){ 
            props.search(searchValue)
            //resets to page 1 when doing a new search
            props.paginate(1)
        }
    }, [searchValue])

    return (
        <>
            <SearchBarContainer>
                <SearchBarContent>
                    <form>
                        <SearchBar
                            value={ searchValue }
                            onChange={ handleSearchInputChanges }
                            type='text'
                            placeholder={ 'Search for Item Sets' }
                        />
                        <SearchButton onClick={ callSearchFunction } type='submit' value='Search'/>
                    </form>
                </SearchBarContent>
            </SearchBarContainer>
        </>
    )
}

export default Search