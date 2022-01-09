import React, { useEffect, useRef, useState } from 'react'

import * as Icons from 'react-icons'

import { useTheme } from 'styled-components'
import ContextMenu, { RefMenu } from '../../components/ContextMenu'
import PickerColor from '../../components/PickerColor'

import { Container } from './styles'

function Home (): React.ReactElement {
  const theme = useTheme().colors
  const menuRef = useRef<RefMenu>()

  const [iconsLib, setIconsLib] = useState<IconLib[]>( // @ts-ignore
    Icons.IconsManifest.sort((a: IconLib, b: IconLib) =>
      a.name.localeCompare(b.name)
    )
  )
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)
  const [color, setColor] = useState(theme.text.normal)

  useEffect(() => {
    ;(async () => {
      const newIconsLib: IconLib[] = []
      for await (const iconLib of iconsLib) {
        await import(`react-icons/${iconLib.id}/index.js`).then((icons) => {
          newIconsLib.push({
            ...iconLib,
            icons
          })
        })
      }
      setIconsLib(
        newIconsLib.sort((a: IconLib, b: IconLib) =>
          a.name.localeCompare(b.name)
        )
      )
    })()
  }, [])

  function handleSelectedIconFamily (index: number) {
    setSelected(index)
  }

  function handleContextMenu (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    iconType: string
  ) {
    const menu = menuRef.current

    if (menu) {
      menu.handleContextMenu(e, iconType)
    }
  }

  function handleCopyOnClick (e: React.MouseEvent<SVGElement, MouseEvent>) {
    const menu = menuRef.current

    if (menu) {
      // @ts-ignore
      menu.handleItemClick({ svg: e.currentTarget })
    }
  }

  function handleChangeColor (color: any) {
    setColor(color.hex)
  }
  return (
    <Container>
      <header>
        <input
          type="search"
          placeholder="Pesquise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <PickerColor color={color} onChange={handleChangeColor} />
      </header>

      <main>
        <aside>
          <ul>
            {iconsLib?.map((Icon, index) => (
              <li
                key={Icon.name}
                onClick={() => handleSelectedIconFamily(index)}
                data-selected={index === selected && 'selected'}
              >
                {Icon.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className="content">
          <Icons.IconContext.Provider
            value={{
              size: '4rem',
              color: color,
              className: 'react-icons'
            }}
          >
            {Object.values(iconsLib[selected]?.icons || {})?.map(
              (Icon, index) => {
                console.log(typeof Icon === 'function')

                if (
                  typeof Icon === 'function' &&
                  Icon.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <Icon
                      key={`${Icon.name}-${index}`}
                      onContextMenu={(e: any) =>
                        handleContextMenu(e, Icon.name)
                      }
                      onClick={handleCopyOnClick}
                    />
                  )
                }

                return null
              }
            )}
          </Icons.IconContext.Provider>
        </div>
      </main>

      <ContextMenu ref={menuRef} iconLibSelected={iconsLib[selected]} />
    </Container>
  )
}

export default Home
