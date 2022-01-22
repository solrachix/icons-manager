import styled from 'styled-components'

export const Container = styled.div`
  width: 12%;
  margin-left: 1rem;

  button {
    width: 100%;
    padding: 0.2rem 0.8rem;

    border: 1px solid ${(props) => props.theme.colors.background.darker};
    background: transparent;
    border-radius: 0.4rem;

    font-weight: normal;
    font-size: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  .picker-color {
    position: absolute;
    top: 4rem;
    right: 1rem;

    background: ${(props) => props.theme.colors.background.normal} !important;

    .flexbox-fix {
      border-color: ${(props) =>
        props.theme.colors.background.darker} !important;
    }

    input {
      box-shadow: none !important;
    }
  }
`
