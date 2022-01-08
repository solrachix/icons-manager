import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #__next {
    background: transparent;
    overflow: hidden;

    min-height: 100%;
    height: 100%;
    max-height: 100%;
  }

  body {
    color: ${(props) => props.theme.colors.text.normal};
    margin: 0;
  }

  body, input, button, select {
    font: 500 16px Poppins;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.normal};
    font-family: Poppins;
  }
  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    display: flex;
    justify-content: center;
    user-select: none;
    cursor: ew-resize;
    position: absolute;
    font-size: 24px;

    &::before {
      width: 1px;
      height: 24px;
      background: ${(props) => props.theme.colors.background.lighter};
      content: '';
    }
  }

  .react-resizable-handle-e {
    right: 0;
    padding-right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  .react-contexify__theme--dark {
    background: ${(props) => props.theme.colors.background.normal} !important;

    .react-contexify__separator{
      background: ${(props) => props.theme.colors.background.darker} !important;
    }
    .react-contexify__item{
      font-weight: 300;

      &:not(.react-contexify__item--disabled):hover > .react-contexify__item__content, 
      &:not(.react-contexify__item--disabled):focus > .react-contexify__item__content {
        background: ${(props) => props.theme.colors.primary.normal} !important;
      }
    }
  }

  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-corner,
  *::-webkit-resizer,
  *::-webkit-scrollbar-button
  {
      width: 100%;
      height: 100%;
      background: ${(props) => props.theme.colors.background.dark};
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
      overflow: visible;
  }
  *::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.primary.normal};
      border-radius: 2px;
  }
`
