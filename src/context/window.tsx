import * as Electron from 'electron'
import { v4 as uuid } from 'uuid'

import React, { createContext, useState, useCallback, useContext } from 'react'

import { useWindows } from './../hooks/useWindows'
import { WindowProps } from './../utils/windowsController'

import { MenuItem, createMenu } from '../components/Menu'
import Notification, { NotificationOptions } from '../components/Notification'
import Window, { WindowOptions } from '../components/Window/index'

import ToastContainer from '../components/ToastContainer'
import { ToastMessage } from '../components/Toast'
import HeaderComponent from './../components/Header'

interface ToastShow {
  (message: Omit<ToastMessage, 'id'>): string
}

interface ToastHide {
  (id: string): void
}

interface Toast {
  addToast: ToastShow
  removeToast: ToastHide
}

interface Menu {
  setItemMenu(options: MenuItem[]): void
  removeItemsMenu(options: string[]): void
}

interface WindowSize {
  width: number
  height: number
}

interface Size {
  getSize(): WindowSize
  setSize(props: WindowSize): void
}

interface WindowContextData {
  newWindow(options: WindowOptions): WindowProps
  newNotification(options: NotificationOptions): void
  Toast: Toast
  Menu: Menu
  Header: {
    hidden(props: boolean): void
    setTitle(props: string): string
  }
  Size: Size
}

const WindowContext = createContext<WindowContextData>({} as WindowContextData)

export const WindowProvider: React.FC = ({ children }) => {
  const [windows, setWindows] = useState<WindowProps[] | []>(
    useWindows('windows')
  )
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const [MenuItems, setMenuItems] = useState<MenuItem[]>([])
  const [title, setStateTitle] = useState(
    Electron.remote.getCurrentWindow().getTitle()
  )
  const [windowSize, setWindowSize] = useState(() => {
    const response = Electron.remote.getCurrentWindow().getSize()

    return {
      width: response[0],
      height: response[1]
    }
  })
  const [header, setHeader] = useState(true)

  const newWindow = (options: WindowOptions) => {
    const id = windows.length || Electron.remote.getCurrentWebContents().id + 1 // webContents.id
    const window = Window({ ...options, id })

    setWindows([...windows, window])
    return window
  }

  const newNotification = (options: NotificationOptions) => {
    Notification(options)
  }

  const Toast: Toast = {
    addToast: useCallback<ToastShow>((message) => {
      const id = uuid()

      setMessages((state) => [...state, { ...message, id }])

      return id
    }, []),
    removeToast: useCallback((id) => {
      setMessages((state) => state.filter((message) => message.id !== id))
    }, [])
  }

  const Menu: Menu = {
    setItemMenu: useCallback((option: MenuItem[]) => {
      const menuItems = [
        ...MenuItems.filter((item) => {
          return option.filter((item2) => item.label !== item2.label)
        }),
        ...option
      ]

      createMenu(menuItems)
      setMenuItems(menuItems)
    }, []),
    removeItemsMenu: useCallback((params: string[]) => {
      const menuItems = [
        ...MenuItems.filter((item) => {
          return params.filter((label) => item.label !== label)
        })
      ]

      createMenu(menuItems)
      setMenuItems(menuItems)
    }, [])
  }

  const Header = {
    hidden (option: boolean) {
      setHeader(option)
    },
    setTitle (name: string): string {
      Electron.remote.getCurrentWindow().setTitle(name)
      setStateTitle(name)

      return name
    }
  }

  const Size = {
    getSize () {
      return windowSize
    },
    setSize ({ width, height }: WindowSize) {
      Electron.remote.getCurrentWindow().setSize(width, height, true)
      setWindowSize({ width, height })
    }
  }
  return (
    <WindowContext.Provider
      value={{ newWindow, newNotification, Toast, Menu, Header, Size }}
    >
      <HeaderComponent {...{ title, hidden: !header }} />

      <ToastContainer toasts={messages} />
      {children}
    </WindowContext.Provider>
  )
}

// Hook próprio
export type WindowContext = WindowContextData
export function useWindow (): WindowContextData {
  const context = useContext(WindowContext)

  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider')
  }

  return context
}
