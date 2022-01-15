import { Theme, createStyles, makeStyles } from '@material-ui/core'
import styled from 'styled-components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4)
    }
  })
)

export const Container = styled.div`
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
          width: 100%;
          height: 3rem;
          padding: 1rem;

          border-bottom: 1px solid
            ${(props) => props.theme.colors.background.darker};

          cursor: pointer;
          transition: all 0.2s;

          &[data-selected='selected'] {
            background-color: ${(props) => props.theme.colors.primary.normal};
            color: ${(props) => props.theme.colors.text.light};
          }

          &:hover {
            border-color: ${(props) => props.theme.colors.primary.normal};
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

      svg {
        width: 4rem;
        height: 4rem;
        margin: 1rem 2rem;
      }
    }
  }
`

export default useStyles
