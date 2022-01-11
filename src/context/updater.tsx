import * as Electron from 'electron'

import React, { createContext, useState, useEffect } from 'react'

interface UpdaterProviderProps {
  children: React.ReactNode
}

const UpdaterContext = createContext(null)

export function UpdaterProvider ({
  children
}: UpdaterProviderProps): React.ReactElement {
  useEffect(() => {
    Electron.ipcRenderer.on('message', (event, text) => {
      console.log(text)
    })
  }, [])

  return (
    <UpdaterContext.Provider value={null}>{children}</UpdaterContext.Provider>
  )
}
