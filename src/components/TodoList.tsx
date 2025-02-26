import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/todos');
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });
      const newTodo: Todo = await response.json();
      setTodos([...todos, newTodo]);
      setInputValue('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });
      const updatedTodo: { id: number; completed: boolean } = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo)));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        disabled={loading}
      />
      <Button onClick={addTodo} disabled={loading}>
        {loading ? '처리 중...' : '추가하기'}
      </Button>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
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
      )}
    </Container>
  );
}
