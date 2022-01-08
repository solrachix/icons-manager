import styled from 'styled-components';
import { rgba } from 'polished'

export const AppStyled = styled.div`
  width: 100vw;
  height: calc(100vh - 25px);
  background: ${props => rgba(props.theme.colors.background.darker, 0.9)};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  
  overflow: auto;
`;
