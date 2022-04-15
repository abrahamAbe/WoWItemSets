import { createGlobalStyle } from 'styled-components'

//define styles to be used accross the app here
const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        text-decoration: none;
    }
    #root{
        margin: 0 auto;
    }
    body{
        background-color: #1A1C23
    }
`

export default GlobalStyles