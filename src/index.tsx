import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { store } from './state/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import appTheme from './styles/appTheme'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <Router>
                <ThemeProvider theme={{ colors: appTheme.colors, dimensions: appTheme.dimensions }}> {/* gives us global access to the theme */}
                    <App />
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
document.getElementById('root')
)