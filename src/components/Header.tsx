import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import orc from '../assets/orc.jpg'

//litElement
import './page-title'
import reactifyWc from 'reactify-wc'

const PageTitle = reactifyWc('page-title')

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 3.1rem;
    border-bottom: 1px solid ${ props => props.theme.colors.lightGray };
    margin-bottom: 2rem;
    background: ${ props => props.theme.colors.darkGray };
`

const HeaderContent = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    max-width: ${ props => props.theme.dimensions.screenWidth };
    color: ${ props => props.theme.colors.white };
`

const Image = styled.img`
    height: 2.3rem;
    width: 2.3rem;
    margin-right: 1rem;
    cursor: pointer;

    @media (max-width: ${ props => props.theme.dimensions.mobileLg }) {
        margin-left: .5rem;
    }
`

const Header:React.FC = () => {
    const navigate = useNavigate()

    return (
        <HeaderContainer>
            <HeaderContent>
                <Image src={ orc } onClick={ () => navigate('/') }/>
                <PageTitle></PageTitle>
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header