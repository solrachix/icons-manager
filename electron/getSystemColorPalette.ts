import { systemPreferences, nativeTheme } from 'electron'
import os from 'os'

interface Palette {
  desktop: string;
  appWorkspace: string;
  windowBackground: string;
  windowText: string;
  menu: string;
  focusIndicator: string;
  textBackground: string;
  text: string;
  disabledText: string;
}

const windowsColors: Palette = {
  desktop: 'desktop',
  appWorkspace: 'app-workspace',
  windowBackground: 'window',
  windowText: 'window-text',
  menu: 'menu',
  focusIndicator: 'active-caption',
  textBackground: 'info-background',
  text: 'info-text',
  disabledText: 'disabled-text'
}

const MacOSColors: Palette = {
  desktop: 'under-page-background',
  appWorkspace: 'control-background',
  windowBackground: 'window-background',
  windowText: 'window-frame-text',
  menu: 'control',
  focusIndicator: 'keyboard-focus-indicator',
  textBackground: 'text-background',
  text: 'text',
  disabledText: 'tertiary-label'
}

interface Return {
  palette: Palette,
  paletteChanged(callback: () => void): void
}
export function getSystemColorPalette (): Return {
  const plataform = os.platform()
  const palette = {} as Palette

  if (plataform === 'win32') {
    Object.keys(windowsColors).map(item => {
      const color = systemPreferences.getColor(windowsColors[item])

      // palette[item] = color
      setDeepVal(palette, item, color)
    })
  } else if (plataform === 'darwin') {
    Object.keys(MacOSColors).forEach(item => {
      const color = systemPreferences.getColor(MacOSColors[item])

      setDeepVal(palette, item, color)
    })
  }

  // const color = systemPreferences.getAccentColor()
  // const red = `#${color.substr(0, 2)}0000`
  // const green = `#00${color.substr(2, 2)}00`
  // const blue = `#0000${color.substr(4, 2)}`
  console.log(palette)
  return {
    palette,
    paletteChanged: (callback: () => void) => {
      nativeTheme.on('updated', callback)
    }
  }
}

function setDeepVal (obj, path: string, val: number | string) {
  const props = path.split('.')
  let i: number, n: number

  for (i = 0, n = props.length - 1; i < n; ++i) {
    obj = obj[props[i]] = obj[props[i]] || {}
  }

  obj[props[i]] = val
  return obj
}

const Windows = [
  '3d-dark-shadow',
  '3d-face',
  '3d-highlight',
  '3d-light',
  '3d-shadow',
  'active-border',
  'active-caption',
  'active-caption-gradient',
  'app-workspace',
  'button-text',
  'caption-text',
  'desktop',
  'disabled-text',
  'highlight',
  'highlight-text',
  'hotlight',
  'inactive-border',
  'inactive-caption',
  'inactive-caption-gradient',
  'inactive-caption-text',
  'info-background',
  'info-text',
  'menu',
  'menu-highlight',
  'menubar',
  'menu-text',
  'scrollbar',
  'window',
  'window-frame',
  'window-text'
] // 29 options

const MacOS = [
  'alternate-selected-control-text',
  'control-background',
  'control',
  'control-text',
  'disabled-control-text',
  'find-highlight',
  'grid',
  'header-text',
  'highlight',
  'keyboard-focus-indicator',
  'label',
  'link',
  'placeholder-text',
  'quaternary-label',
  'scrubber-textured-background',
  'secondary-label',
  'selected-content-background',
  'selected-control',
  'selected-control-text',
  'selected-menu-item-text',
  'selected-text-background',
  'selected-text',
  'separator',
  'shadow',
  'tertiary-label',
  'text-background',
  'text',
  'under-page-background',
  'unemphasized-selected-content-background',
  'unemphasized-selected-text-background',
  'unemphasized-selected-text',
  'window-background',
  'window-frame-tex'
] // 32 options
