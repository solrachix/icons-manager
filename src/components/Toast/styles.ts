import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { animated } from 'react-spring'

interface ContainerProps {
  type: 'success' | 'error' | 'info'
  hasDescription: boolean
}

export const Container = styled(animated.div)<ContainerProps>`
  ${(props) => {
    const toastTypes = {
      info: css`
        background: ${rgba(props.theme.colors.blue, 0.2)};
        color: ${props.theme.colors.blue};
      `,
      success: css`
        background: ${rgba(props.theme.colors.green, 0.2)};
        color: ${props.theme.colors.green};
      `,
      error: css`
        background: ${rgba(props.theme.colors.red, 0.2)};
        color: ${props.theme.colors.red};
      `
    }

    return css`
      width: 320px;

      position: relative;
      padding: 16px 30px 16px 16px;
      margin: 0 24px 8px 0;
      border-radius: 4px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

      display: flex;

      ${toastTypes[props.type]}

      &:first-child {
        margin-top: 24px;
      }

      svg {
        margin: 3px 12px 0 0;
      }

      div {
        flex: 1;
        margin-right: 16px;

        strong {
          font-size: 14px;
        }

        p {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.7;
          line-height: 18px;
        }
      }

      button {
        position: absolute;
        right: 8px;
        top: 18px;
        opacity: 0.6;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }
      }

      ${!props.hasDescription &&
      css`
        align-items: flex-start;

        svg {
          margin-top: 4px !important;
        }
      `}
    `
  }}
`
