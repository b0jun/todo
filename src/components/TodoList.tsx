import { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: ${(props) => props.theme.todoBackground};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const TodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const TodoItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.todoBackground};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${(props) => (props.completed ? 'gray' : 'inherit')};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: darkred;
  }
`;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
      <Button onClick={addTodo}>추가하기</Button>

      <TodoListContainer>
        {todos.map((todo) => (
          <TodoItem key={todo.id} completed={todo.completed}>
            <span onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? '완료' : '미완료'} {todo.text}
            </span>
            <DeleteButton onClick={() => deleteTodo(todo.id)}>삭제</DeleteButton>
          </TodoItem>
        ))}
      </TodoListContainer>
    </Container>
  );
}
