import React, { useEffect } from 'react'

import styled from 'styled-components'

const ScreenContent = styled.div`
    display: flex;
    justify-content: center;
`

const Home:React.FC = () => {

    useEffect(() => {
        console.log('Home screen')
    }, [])

    return (
        <>
            <ScreenContent>
                Home
            </ScreenContent>
        </>
    )
}

export default Home