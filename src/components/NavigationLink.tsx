import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationLinkContainer = styled(Link)`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    color: ${ props => props.theme.colors.lightBlue };
    font-size: 1.5rem;
`

interface Props{
    routeString: string
}

const NavigationLink:React.FC<Props> = (props: Props) => {

    return (
        <NavigationLinkContainer to={`/${props.routeString}`}>Go back</NavigationLinkContainer>
    )
}

export default NavigationLink