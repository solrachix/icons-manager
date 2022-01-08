import electron, { BrowserWindow as ElectronBrowserWindow, remote } from 'electron'
import { getWindow, setWindow, WindowProps } from './windowsController'
import { getWindowBounds, setWindowBounds } from './windowBoundsController'
import { getAlwaysOnTop } from './alwaysOnTopController'

interface Options extends Electron.BrowserWindowConstructorOptions {
  id?: number;
  themeSource?: 'light' | 'dark' | 'system';
  partition?: string;
  APPAlreadyInitialized?: boolean;
}

export default function Window (options: Options | null): Electron.BrowserWindow {
  const APPAlreadyInitialized = options?.APPAlreadyInitialized
  const partition = options?.partition || 'persist:electron'

  if (!options?.APPAlreadyInitialized) {
    electron.nativeTheme.themeSource = options?.themeSource || 'system'
  }

  options?.APPAlreadyInitialized && delete options.APPAlreadyInitialized
  options?.partition && delete options.partition
  options?.themeSource && delete options.themeSource

  const BrowserWindow = APPAlreadyInitialized ? remote.BrowserWindow : ElectronBrowserWindow

  let window: Electron.BrowserWindow | null = new BrowserWindow({
    ...options,
    ...getWindowBounds(),
    resizable: true,

    // backgroundColor: systemPreferences.isAeroGlassEnabled()
    //   ? undefined : '#1C2028',
    // transparent: !!systemPreferences.isAeroGlassEnabled(),
    transparent: true,

    frame: false,
    titleBarStyle: 'hidden',
    alwaysOnTop: false /* getAlwaysOnTop() */,

    hasShadow: true,
    vibrancy: 'ultra-dark',
    // opacity: 0.9,

    webPreferences: {
      experimentalFeatures: true,
      nodeIntegration: true,
      webviewTag: true,
      partition,
      spellcheck: true
    }
  })

  const WindowProps = {
    id: options?.id || 0,
    title: options?.title || 'Electron',
    ...getWindowBounds(),
    webContentsID: window.webContents.id
  }

  delete WindowProps.x
  delete WindowProps.y

  setWindow(WindowProps)

  window.on('close', () => {
    setWindowBounds(window?.getBounds())
  })

  window.on('closed', () => {
    window = null
  })

  if (process.platform !== 'linux') {
    // rewrite getNormalBounds, maximize, unmaximize and isMaximized API for the transparent window
    let resizable = window.isResizable()
    let normalBounds = window.getNormalBounds ? window.getNormalBounds() : window.getBounds()

    window.getNormalBounds = function (this: electron.BrowserWindow) {
      if (!this.isMaximized()) {
        if (BrowserWindow.prototype.getNormalBounds) {
          normalBounds = BrowserWindow.prototype.getNormalBounds.call(this)
        } else {
          normalBounds = BrowserWindow.prototype.getBounds.call(this)
        }
      }
      return normalBounds
    }.bind(window)

    window.maximize = function (this: electron.BrowserWindow) {
      normalBounds = this.getNormalBounds() // store the bounds of normal window
      resizable = this.isResizable() // store resizable value
      BrowserWindow.prototype.maximize.call(this)
      if (!BrowserWindow.prototype.isMaximized.call(this)) {
        // while isMaximized() was returning false, it will not emit 'maximize' event
        this.emit('maximize', { sender: this, preventDefault: () => {} })
      }
      this.setResizable(false) // disable resize when the window is maximized
    }.bind(window)

    window.unmaximize = function (this: electron.BrowserWindow) {
      const fromMaximized = BrowserWindow.prototype.isMaximized.call(this)
      BrowserWindow.prototype.unmaximize.call(this)
      if (!fromMaximized) {
        // isMaximized() returned false before unmaximize was called, it will not emit 'unmaximize' event
        this.emit('unmaximize', { sender: this, preventDefault: () => {} })
      }
      this.setResizable(resizable) // restore resizable
    }.bind(window)

    window.isMaximized = function (this: electron.BrowserWindow) {
      const nativeIsMaximized = BrowserWindow.prototype.isMaximized.call(this)

      if (!nativeIsMaximized) {
        // determine whether the window is full of the screen work area
        const bounds = this.getBounds()
        const workArea = electron.screen.getDisplayMatching(bounds).workArea
        if (bounds.x <= workArea.x && bounds.y <= workArea.y && bounds.width >= workArea.width && bounds.height >= workArea.height) {
          return true
        }
      }
      return nativeIsMaximized
    }.bind(window)
  }

  return window
}
