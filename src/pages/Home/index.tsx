import React, { useEffect, useRef, useState } from 'react'

import * as Icons from 'react-icons'
import { IconType } from 'react-icons/lib'
import { IconlyGlass } from '../../assets'

import cx from 'classnames'
import { useTheme } from 'styled-components'

import ContextMenu, { RefMenu } from '../../components/ContextMenu'
import PickerColor from '../../components/PickerColor'

import { Container } from './styles'
import ReactTooltip from 'react-tooltip'

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
  const [icons, setIcons] = useState<string[]>([])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [iconsLib])

  useEffect(() => {
    setIcons(
      Object.keys(iconsLib[selected].icons || {}).filter(
        (iconName) =>
          iconName.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    )
  }, [search, selected])

  useEffect(() => {
    ;(async () => {
      let newIconsLib: IconLib[] = []
      newIconsLib.push(IconlyGlass)

      for await (const iconLib of iconsLib) {
        await import(`react-icons/${iconLib.id}/index.js`).then((icons) => {
          newIconsLib.push({
            ...iconLib,
            icons
          })
        })
      }

      newIconsLib = newIconsLib.sort(
        (a: IconLib, b: IconLib) =>
          /* Number(a?.new) === 0 ? */ a.name.localeCompare(b.name) /* : 1 */
      )

      setIcons(Object.keys(newIconsLib[selected].icons || {}))
      setIconsLib(newIconsLib)
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
      menu.handleItemClick({ props: { svg: e.currentTarget } })
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
                className={cx({ new: Icon?.new })}
                data-selected={index === selected && 'selected'}
                data-tip={
                  Icon?.new &&
                  `A Biblioteca ${Icon.name}, foi adicionado recentemente. De uma chance para ela 🙃`
                }
              >
                <div className="ball" />
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
            {icons?.map((IconName, index) => {
              let Icon

              if (iconsLib[selected].isExternal) {
                Icon = iconsLib[selected]?.icons[IconName]
              } else {
                Icon = iconsLib[selected]?.icons?.default[IconName]
              }
              if (!(typeof Icon === 'function')) return

              return (
                <Icon
                  key={`${IconName}-${index}`}
                  onContextMenu={(e: any) => handleContextMenu(e, IconName)}
                  onClick={handleCopyOnClick}
                />
              )
            })}
          </Icons.IconContext.Provider>
        </div>
      </main>

      <ContextMenu ref={menuRef} iconLibSelected={iconsLib[selected]} />
    </Container>
  )
}

export default Home
