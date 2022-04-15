import styled from 'styled-components'

const ScreenContainer = styled.div`
    max-width: ${ props => props.theme.dimensions.screenWidth };
    padding: ${ props => props.theme.dimensions.screenPadding };
    margin: auto;
    height: 100vh;
    background-color: ${ props => props.theme.colors.screenBackground };
    color: ${ props => props.theme.colors.white };
`
export default ScreenContainer