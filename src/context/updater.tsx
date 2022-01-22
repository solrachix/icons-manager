import * as Electron from 'electron'

import React, { createContext, useEffect } from 'react'
import { useWindow } from './window'

interface UpdaterProviderProps {
  children: React.ReactNode
}

const UpdaterContext = createContext(null)

export function UpdaterProvider ({
  children
}: UpdaterProviderProps): React.ReactElement {
  const { Toast } = useWindow()

  useEffect(() => {
    Electron.ipcRenderer.on('message', (event, text) => {
      Toast.addToast({
        type: 'info',
        title: 'Atualização',
        description: text
      })
    })
  }, [])

  return (
    <UpdaterContext.Provider value={null}>{children}</UpdaterContext.Provider>
  )
}
