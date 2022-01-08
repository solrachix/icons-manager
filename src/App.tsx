import React from 'react'
import { render } from 'react-dom'

import { GlobalStyle } from './styles/GlobalStyle'
import { DarkTheme } from './styles/themes'
import { ThemeProvider } from 'styled-components'

import { AppStyled } from './styles/App.styles'

import AppProvider from './context'

import Routes from './routes'

const mainElement = document.createElement('div')
const modalElement = document.createElement('div')

mainElement.id = 'root'
modalElement.id = 'modal'

document.body.appendChild(mainElement)
document.body.appendChild(modalElement)

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyle />

      <AppProvider>
        <AppStyled>
          <Routes />
        </AppStyled>
      </AppProvider>
    </ThemeProvider>
  )
}

render(<App />, mainElement)
