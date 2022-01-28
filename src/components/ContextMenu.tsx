import { shell } from 'electron'
import React, { forwardRef, useImperativeHandle } from 'react'

import {
  Menu,
  Submenu,
  Item,
  Separator,
  useContextMenu,
  ItemParams
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

import { transform } from '@svgr/core'

import HtmlToJsx from 'htmltojsx'

import { useWindow } from '../context/window'

interface Props {
  iconLibSelected: IconLib
}

export type RefMenu = {
  handleContextMenu(
    event: React.MouseEvent<SVGElement, MouseEvent>,
    iconType: string
  ): void
  handleItemClick({
    event,
    props
  }: {
    event: React.MouseEvent<SVGElement, MouseEvent>
    props: {
      svg: SVGElement
    }
  }): void
}

const MENU_ID = 'menu'

function ContextMenu ({ iconLibSelected }: Props, ref: any) {
  const { Toast } = useWindow()
  const { show } = useContextMenu({
    id: MENU_ID
  })

  useImperativeHandle(ref, () => ({
    handleContextMenu,
    handleItemClick
  }))

  function handleContextMenu (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    iconType: string
  ) {
    event.preventDefault()
    show(event, {
      props: { svg: event.currentTarget, iconType }
    })
  }

  function handleItemClick ({ event, props }: ItemParams<{ svg: SVGElement }>) {
    navigator.clipboard.writeText(props?.svg.outerHTML || '')
    Toast.addToast({
      type: 'success',
      title: 'Copiado',
      description: 'SVG copiado com sucesso!'
    })
  }

  async function handleItemCopyCode (
    { props }: ItemParams<{ svg: SVGElement; iconType: string }>,
    type: string
  ) {
    let text = ''

    if (type === 'name') {
      text = props?.iconType || ''
    } else if (type === 'component-RA') {
      text = `<${props?.iconType} />`
    } else if (type === 'import') {
      text = `import { ${props?.iconType} } from 'react-icons/${iconLibSelected.id}'`
    } else if (type === 'component') {
      text = await transform(
        String(props?.svg.outerHTML),
        { icon: true },
        { componentName: props?.iconType }
      )
    } else if (type === 'jsx') {
      const converter = new HtmlToJsx({
        createClass: false
      })

      text = converter.convert(String(props?.svg.outerHTML))
    }

    navigator.clipboard.writeText(text)
    Toast.addToast({
      type: 'success',
      title: 'Copiado',
      description: 'Seu código foi copiado com sucesso!'
    })
  }

  return (
    <Menu id={MENU_ID} theme="dark">
      <Item onClick={handleItemClick}>Copiar SVG</Item>

      {!iconLibSelected?.isExternal && (
        <Submenu label="React-icons">
          <Item onClick={(e) => handleItemCopyCode(e, 'name')}>
            Copiar nome do ícone
          </Item>
          <Item onClick={(e) => handleItemCopyCode(e, 'import')}>
            Copiar importação
          </Item>
          <Item onClick={(e) => handleItemCopyCode(e, 'component-RA')}>
            Copiar elemento React
          </Item>
        </Submenu>
      )}

      <Item onClick={(e) => handleItemCopyCode(e, 'jsx')}>Copiar JSX</Item>
      <Item onClick={(e) => handleItemCopyCode(e, 'component')}>
        Copiar componente React
      </Item>

      {!iconLibSelected?.isExternal && <Separator />}

      <Item disabled>{iconLibSelected.name}</Item>

      {iconLibSelected?.projectUrl && (
        <>
          <Separator />
          <Item
            onClick={() =>
              shell.openExternal(String(iconLibSelected?.projectUrl))
            }
          >
            Ir para o site
          </Item>
        </>
      )}
    </Menu>
  )
}

export default forwardRef(ContextMenu)
