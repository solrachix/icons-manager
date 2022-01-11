import React from 'react'
import { HashRouter } from 'react-router-dom'

import { WindowProvider } from './window'
import { UpdaterProvider } from './updater'

interface Props {
  children: React.ReactNode
}

function AppProvider ({ children }: Props): React.ReactElement {
  return (
    <HashRouter>
      <WindowProvider>
        <UpdaterProvider>{children}</UpdaterProvider>
      </WindowProvider>
    </HashRouter>
  )
}

export default AppProvider
