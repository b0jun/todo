import { http, HttpResponse } from 'msw';

// 요청 바디의 타입 정의
interface TodoRequestBody {
  text?: string;
  completed?: boolean;
}

// 응답 타입 정의 (선택적)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const handlers = [
  http.get('/api/todos', async () => {
    return HttpResponse.json<Todo[]>([
      { id: 1, text: '타입스크립트 공부', completed: false },
      { id: 2, text: '리액트 공부', completed: true },
      { id: 3, text: '넥스트 공부', completed: false },
    ]);
  }),

  http.post('/api/todos', async ({ request }) => {
    const body = (await request.json()) as TodoRequestBody;
    const { text } = body;
    if (!text) {
      return HttpResponse.json({ error: '텍스트가 필요해요' }, { status: 400 });
    }
    return HttpResponse.json({ id: Date.now(), text, completed: false }, { status: 201 });
  }),

  http.delete('/api/todos/:id', async ({ params }) => {
    return HttpResponse.json({ message: `${params.id} 삭제` }, { status: 200 });
  }),

  http.patch('/api/todos/:id', async ({ request, params }) => {
    const body = (await request.json()) as TodoRequestBody;
    const { completed } = body;
    if (typeof completed === 'undefined') {
      return HttpResponse.json({ error: '에러' }, { status: 400 });
    }
    return HttpResponse.json({ id: Number(params.id), completed }, { status: 200 });
  }),
];
