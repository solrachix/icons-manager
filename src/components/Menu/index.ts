import { remote } from 'electron'
import contextMenu from 'electron-context-menu'

type MenuItem = {
  label: string
  visible?: boolean
  click: () => unknown
}

const createItem = (option: MenuItem): void => {
  contextMenu({
    prepend: (defaultActions, params, browserWindow) => [option]
  })
}

const createMenu = (Items: MenuItem[]): void => {
  const currentWebContents = remote.getCurrentWebContents()

  contextMenu({
    prepend: (defaultActions, params, browserWindow) => Items,
    window: currentWebContents
  })
}

export type { MenuItem }
export { createMenu, createItem }
