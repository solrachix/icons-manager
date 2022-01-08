import { windows as Windows } from '../store/windows'

export interface WindowProps {
  id: number;
  title: string;
  width?: number;
  minWidth?: number;
  minHeight?: number;
  height?: number;
}

export const getWindow = function (WindowId: number): WindowProps {
  console.log(Windows.get('windows'))
  const {
    id,
    title,
    width,
    minWidth,
    height,
    minHeight
  } = Windows.get('windows')[WindowId] as WindowProps

  return {
    id,
    title,
    width: width || 1100,
    height: height || 700,
    minWidth,
    minHeight
  }
}

export const setWindow = function (props: WindowProps): void{
  if (!props) {
    return
  }
  const newWindows:WindowProps[] = (Windows.get('windows') as WindowProps[])
  newWindows.push(props)

  console.log(newWindows)
  const windows = newWindows.map(window => {
    return window.id === props.id ? props : window
  })

  console.log(props, windows)
  Windows.set('windows', windows)
}
