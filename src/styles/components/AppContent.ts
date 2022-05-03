import styled from 'styled-components'

const AppContent = styled.div`
    min-height: 100vh;
    max-width: ${ props => props.theme.dimensions.screenWidth };
    padding: ${ props => props.theme.dimensions.screenPadding };
    margin: auto;
    background-color: ${ props => props.theme.colors.darkGray };
    color: ${ props => props.theme.colors.white };
`

export default AppContent