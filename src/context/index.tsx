import React from 'react'
import { HashRouter } from 'react-router-dom'

import { WindowProvider } from './window'
const AppProvider: React.FC = ({ children }) => {
  return (
    <HashRouter>
      <WindowProvider>
        {children}
      </WindowProvider>
    </HashRouter>
  )
}

export default AppProvider
