import styled from 'styled-components'

interface ContainerProps {
  iconsColor: string
}
export const Container = styled.div<ContainerProps>`
  header {
    position: relative;
    width: 100%;
    height: 4rem;
    padding: 1rem;

    background: ${(props) => props.theme.colors.background.normal};
    border-bottom: 1px solid ${(props) => props.theme.colors.background.darker};

    display: flex;

    input {
      width: 100%;
      padding: 0.4rem 0.6rem;

      color: ${(props) => props.theme.colors.text.light};
      background: ${(props) => props.theme.colors.background.light};
      border: 1px solid ${(props) => props.theme.colors.background.darker};
      border-radius: 0.4rem;

      font-weight: normal;

      &::placeholder {
        color: ${(props) => props.theme.colors.text.normal};
      }
    }
  }

  main {
    width: 100%;
    height: calc(100% - 4rem);

    display: flex;

    aside {
      width: 30vw;

      background: ${(props) => props.theme.colors.background.normal};

      overflow: auto;

      ul {
        list-style: none;

        li {
          position: relative;
          width: 100%;
          height: 3rem;
          padding: 1rem;

          border-bottom: 1px solid
            ${(props) => props.theme.colors.background.darker};

          display: flex;
          align-items: center;

          cursor: pointer;
          transition: all 0.2s;

          &[data-selected='selected'] {
            background-color: ${(props) => props.theme.colors.primary.normal};
            color: ${(props) => props.theme.colors.text.light};
          }

          &:hover {
            border-color: ${(props) => props.theme.colors.primary.normal};
          }

          .ball {
            display: none;
            width: 8px;
            height: 8px;
            margin-right: 1rem;

            border-radius: 50%;

            background-color: ${(props) => props.theme.colors.green};
          }

          &.new {
            padding-left: 1rem;

            .ball {
              display: block;
            }
          }
        }
      }
    }

    .content {
      flex: 1;
      width: 100%;
      height: fit-content;
      max-height: 100%;
      padding: 1rem;
      padding-right: 0rem;

      display: flex;
      flex-wrap: wrap;
      gap: 20rem;
      justify-content: center;

      overflow: auto;

      .variants {
        width: 100%;

        display: flex;
        gap: 2rem;

        button {
          padding: 0.1rem 1rem;
          margin: 0 1rem;

          color: ${(props) => props.theme.colors.primary.normal};
          border: 1px solid ${(props) => props.theme.colors.primary.normal};
          background: transparent;
          border-radius: 1rem;

          cursor: pointer;

          &.selected {
            background: ${(props) => props.theme.colors.primary.normal};
            color: ${(props) => props.theme.colors.text.light};
          }
        }
      }

      svg {
        width: 4rem;
        height: 4rem;
        margin: 1rem 2rem;

        &.external {
          &.fill-icon-color path {
            fill: ${(props) => props.iconsColor};
          }

          &.stroke-icon-color path {
            stroke: ${(props) => props.iconsColor};
          }
        }
      }

      .not-found-icons {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        text-align: center;

        span {
          font-size: 1.8rem;
        }

        b {
          font-size: 4rem;
        }
      }
    }
  }
`
