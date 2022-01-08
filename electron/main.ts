import {
  app,
  globalShortcut,
  BrowserWindow,
  nativeImage,
  shell
} from 'electron'
import contextMenu from 'electron-context-menu'
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer'
import * as path from 'path'
import * as url from 'url'
import Window from '../src/utils/window'
import { getSystemColorPalette } from './getSystemColorPalette'

let mainWindow: Electron.BrowserWindow // | null
let webContents: Electron.WebContents
console.log(process.platform)

getSystemColorPalette()

function createWindow () {
  const partition = 'persist:ellipsus'
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

  if (app.dock) {
    app.dock.setIcon(icon)
  }
  const splashScreen = new BrowserWindow({
    icon,
    width: 400,
    height: 400,
    backgroundColor: '#1C2028',
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })
  splashScreen.loadURL(
    chooseUrl(
      `${app.getAppPath()}/build/splashScreen.html`,
      'splashScreen.html'
    )
  )

  mainWindow = Window({
    id: 0,
    title: 'Thoth',
    icon,
    themeSource: 'dark',
    show: false,
    minWidth: 760,
    minHeight: 500,
    partition
  })
  mainWindow.loadURL(chooseUrl('http://localhost:4000', 'renderer/index.html'))

  mainWindow.once('ready-to-show', () => {
    splashScreen.destroy()
    mainWindow.show()

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))

    mainWindow.webContents.on('before-input-event', (event, input) => {
      mainWindow.webContents.setIgnoreMenuShortcuts(
        !input.control && !input.meta
      )
    })
  })

  webContents = mainWindow.webContents
}

const chooseUrl = (development: string, production: string): string => {
  if (process.env.NODE_ENV === 'development') {
    return development
  } else {
    return url.format({
      pathname: path.join(__dirname, production),
      protocol: 'file:',
      slashes: true
    })
  }
}
const recreateWindow = () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}

const toggleDevTools = () => webContents.toggleDevTools()
const toggleReload = () => webContents.reload()

const createShortcuts = () => {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
  globalShortcut.register('Cmd+ROrCtrl+R', toggleReload)
}

app.on('web-contents-created', (e, contents) => {
  if (contents.getType() === 'webview') {
    // open link with external browser in webview
    contents.on('new-window', (e, url) => {
      e.preventDefault()
      shell.openExternal(url)
    })
  }

  contextMenu({
    showSaveImage: true,
    showCopyImageAddress: true,
    showServices: true,
    showSearchWithGoogle: false,
    shouldShowMenu: (event, params) => !params.isEditable, // Não mostra o menu se o elemento for editável
    labels: {
      copy: 'Copiar',
      paste: 'Colar',
      cut: 'Recortar',
      saveImage: 'Guardar imagem como…',
      saveImageAs: 'Guardar imagem como…',
      copyImage: 'Copiar imagem',
      copyImageAddress: 'Copiar endereço da imagem',
      lookUpSelection: 'Consultar “{selection}”',
      copyLink: 'Copiar Link',
      inspect: 'Inspecionar'
    },
    prepend: (defaultActions, params, browserWindow) => [
      {
        label: 'Pesquisar no google, por “{selection}”',
        // Only show it when right-clicking text
        visible: params.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(
            `https://google.com/search?q=${encodeURIComponent(
              params.selectionText
            )}`
          )
        }
      }
    ],
    // menu: (defaultActions, params, browserWindow, dictionarySuggestions) => {

    // },
    window: contents
  })
})

app.on('ready', () => {
  setTimeout(() => {
    createWindow()
    createShortcuts()
  }, 2000)
})

app.on('activate', recreateWindow)
app.allowRendererProcessReuse = true
app.commandLine.appendSwitch('--enable-experimental-web-platform-features')
