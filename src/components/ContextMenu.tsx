import { shell } from 'electron'
import React, { forwardRef, useImperativeHandle } from 'react'

import {
  Menu,
  Item,
  Separator,
  useContextMenu,
  ItemParams
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
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

  function handleItemCopyCode (
    { props }: ItemParams<{ svg: SVGElement; iconType: string }>,
    type: string
  ) {
    let text = ''

    if (type === 'name') {
      text = props?.iconType || ''
    } else if (type === 'element') {
      text = `<${props?.iconType} />`
    } else if (type === 'import') {
      text = `import { ${props?.iconType} } from 'react-icons/${iconLibSelected.id}'`
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
      <Item onClick={(e) => handleItemCopyCode(e, 'name')}>
        Copiar nome do ícone na &quot;react-icons&quot;
      </Item>
      <Item onClick={(e) => handleItemCopyCode(e, 'import')}>
        Copiar importação &quot;react-icons&quot;
      </Item>
      <Item onClick={(e) => handleItemCopyCode(e, 'element')}>
        Copiar elemento React
      </Item>
      <Separator />
      <Item disabled>{iconLibSelected.name}</Item>
      <Separator />
      <Item onClick={() => shell.openExternal(iconLibSelected.projectUrl)}>
        Ir para o site
      </Item>
    </Menu>
  )
}

export default forwardRef(ContextMenu)
