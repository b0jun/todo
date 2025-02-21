import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: ${(props) => props.theme.text};
`;

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  color: ${(props) => props.theme.buttonText};
  font-size: 22px;
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <Container>
      <h1>Todo</h1>
      <ToggleButton onClick={toggleTheme}>{darkMode ? '🌞' : '🌜'}</ToggleButton>
    </Container>
  );
}
