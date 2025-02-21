import TodoList from './components/TodoList';
import { GlobalStyles } from './styles/GlobalStyles';
import { Global } from '@emotion/react';
import Header from './components/Header';
import { ThemeProviderWrapper } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProviderWrapper>
      <Global styles={GlobalStyles} />
      <Header />
      <TodoList />
    </ThemeProviderWrapper>
  );
}
