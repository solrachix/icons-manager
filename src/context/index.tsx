import React from 'react'
import { HashRouter } from 'react-router-dom'

import ReactTooltip from 'react-tooltip'

import { WindowProvider } from './window'
import { UpdaterProvider } from './updater'

interface Props {
  children: React.ReactNode
}

function AppProvider ({ children }: Props): React.ReactElement {
  return (
    <HashRouter>
      <WindowProvider>
        <UpdaterProvider>
          <ReactTooltip />
          {children}
        </UpdaterProvider>
      </WindowProvider>
    </HashRouter>
  )
}

export default AppProvider
