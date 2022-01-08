/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('dotenv').config()

import { remote } from 'electron'
import * as path from 'path'
import * as URL from 'url'
import Window from '../../utils/window'
import { getWindow, WindowProps } from '../../utils/windowsController'

console.log(process.platform)

export interface WindowOptions extends Electron.BrowserWindowConstructorOptions {
  id: number;
  title: string;
  url: string;
  partition?: string;
}

const createWindow = ({ title, url, ...options }: WindowOptions): WindowProps /* Electron.WebContents */ => {
  const veracity = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2})\S*$/
  const partition = options.partition || 'persist:electron'
  let newUrl: string = url
  let atualUrl: string = url
  // const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

  // if (app.dock) {
  //   app.dock.setIcon(icon)
  // }
  if (process.env.NODE_ENV === 'development') {
    atualUrl = (new URL.URL(remote.getCurrentWebContents().getURL())).origin + '/#'
  } else {
    atualUrl = remote.getCurrentWebContents().getURL().split('#/')[0] + '#'
  }

  if (veracity.test(url)) {
    newUrl = `${atualUrl}/webview/${url.replaceAll('/', '-')}`.replaceAll(' ', '')
  } else {
    newUrl = `${atualUrl}/${url}`
  }

  console.log(options.id)
  // window.open(newUrl)
  const mainWindow = Window({ title: title, show: true, partition, APPAlreadyInitialized: true, ...options })
  const webContents = mainWindow.webContents

  mainWindow.loadURL(newUrl)

  mainWindow.once('ready-to-show', () => {
    webContents.on('before-input-event', (event, input) => {
      webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
    })
  })

  return getWindow(options.id)
}

export default createWindow
