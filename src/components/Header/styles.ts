import styled, { css } from 'styled-components'

interface ContainerProps {
  reverse: boolean;
}

export const Container = styled.header<ContainerProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 25px;
  top: 0;
  left: 0;

  padding-left: 10px;
  padding-right: 10px;

  box-sizing: border-box;
  background-color: ${props => props.theme.colors.background.dark};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0, 0.4);
  *::-moz-selection,
  *::selection,
  input::-moz-selection,
  input::selection {
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.primary.normal};
  }

  -webkit-app-region: drag;
  -webkit-user-select: none;

  font-family: Poppins;
  line-height: 30px;

  flex-shrink: 0;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  justify-content: center/* space-between */;
  align-items: center;
  
  z-index: 99999;
`

export const Titleshown = styled.div`
  width: calc(100% - 120px);
  height: 100%;

  margin-left: auto;
  margin-right: auto;

  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;

  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  p {
    -webkit-app-region: no-drag;

    color: ${props => props.theme.colors.primary.normal};
    font-size: 1em;
    font-family: Poppins;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const WindowActions = styled.div`
  /* position: absolute; */
  display: flex;
  width: 86px;
  height: 100%;

  -webkit-app-region: no-drag;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

interface MacActionButtonProps {
  color: 'close' | 'minimize' | 'maximize';
}

export const MacActionButton = styled.button<MacActionButtonProps>`${(props) => {
  const colors = {
    close: props.theme.colors.red,
    minimize: props.theme.colors.yellow,
    maximize: props.theme.colors.green
  }

  return css`
    background: ${colors[props.color]};
    border: 0;
    width: 12px;
    height: 12px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    & + button {
      margin-left: 8px;
    }

    svg {
      width: 8px;
      height: 8px;
      opacity: 0.9;
      display: none;
    }

    &:hover svg {
      display: block;
    }

    &:active {
      opacity: 0.6;
    }

    &:focus {
      outline: 0;
    }
  `
}}`

interface DefaultActionButtonProps {
  pointerEvents: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'visibleFill' | 'painted',

}
export const DefaultActionButton = styled.button<DefaultActionButtonProps>`
  display: flex;
  /* float: left; */
  height: 100%;
  width: 33%;

  background: transparent;
  border: 0;
  
  color: ${({ pointerEvents = 'auto', theme }) => pointerEvents === 'none' ? theme.colors.white : theme.colors.primary.normal};
  
  font-weight: 900;
  font-size: .6em;
  font-family: Poppins;
  text-align: center;

  cursor: default;
  pointer-events: ${({ pointerEvents = 'auto' }) => pointerEvents};
  
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & + button {
    margin-left: 8px;
  }

  &:hover svg {
    color: ${props => props.theme.colors.white};
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: 0;
  }
`

export const MenuButton = styled.div`
  /* position: absolute; */
  display: flex;
  width: 10px;
  height: 100%;

  text-align: center;
  color: ${props => props.theme.colors.primary.normal};
  font-weight: 900;
  font-size: 1em;
  font-family: Poppins;

  cursor: default;
  z-index: 1;

  justify-content: center;
  align-items: center;

  -webkit-app-region: no-drag;
`
