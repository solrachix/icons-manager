import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react'
import os from 'os'

import { remote, shell } from 'electron'

import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

import {
  Container,
  Titleshown,
  WindowActions,
  MacActionButton,
  DefaultActionButton,
  MenuButton
} from './styles'

import { useConfig } from '../../hooks/useConfig'
import { ThemeContext } from 'styled-components'
import { useWindow } from '../../context/window'

interface HeaderProps {
  title: string
  hidden: boolean
}
function Header ({ hidden, title }: HeaderProps) {
  const { Menu } = useWindow()
  const theme = useContext(ThemeContext).colors

  const [isMaximized, setIsMaximized] = useState<boolean>(false)

  // useEffect(() => {
  //   Menu.setItemMenu([
  //     {
  //       label: 'Sobre o autor',
  //       visible: true,
  //       click: () => shell.openExternal('https://solrachix.app')
  //     }
  //   ])
  // }, [])

  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    if (!window.isMaximized()) {
      window.maximize()
      setIsMaximized(true)
    } else {
      window.unmaximize()
      setIsMaximized(false)
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  const useMacOSWindowActionButtons = useConfig('useMacOSWindowActionButtons')

  const [shouldUseMacOSWindowActions] = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin'
  }, [useMacOSWindowActionButtons])

  if (hidden) return <></>

  return (
    <Container reverse={shouldUseMacOSWindowActions}>
      <MenuButton onClick={() => console.log('')}>&#8285;</MenuButton>

      <Titleshown id="titleshown">
        <p>Icon Manager</p>
      </Titleshown>

      <WindowActions>
        {shouldUseMacOSWindowActions ? (
          <>
            <MacActionButton color="close" onClick={handleCloseWindow}>
              <FiX />
            </MacActionButton>
            <MacActionButton color="minimize" onClick={handleMinimize}>
              <FiMinus />
            </MacActionButton>
            <MacActionButton color="maximize" onClick={handleMaximize}>
              {!isMaximized ? <FiMaximize2 /> : <FiMinimize2 />}
            </MacActionButton>
          </>
        ) : (
          <>
            <DefaultActionButton pointerEvents="auto" onClick={handleMinimize}>
              <FiMinus size={12} />
            </DefaultActionButton>
            <DefaultActionButton pointerEvents="auto" onClick={handleMaximize}>
              {!isMaximized ? (
                <FiMaximize2 size={10} />
              ) : (
                <FiMinimize2 size={10} />
              )}
            </DefaultActionButton>
            <DefaultActionButton
              pointerEvents="auto"
              onClick={handleCloseWindow}
            >
              <FiX size={12} />
            </DefaultActionButton>
          </>
        )}
      </WindowActions>
    </Container>
  )
}

export default Header
