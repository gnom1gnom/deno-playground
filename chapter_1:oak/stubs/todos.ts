import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts"

// interface
import { Todo } from '../interfaces/Todo.ts';

const todos: Todo[] = [
  {
    id: nanoid(),
    todo: 'walk dog',
    isCompleted: true,
  },
  {
    id: nanoid(),
    todo: 'eat food',
    isCompleted: false,
  },
  {
    id: nanoid(),
    todo: 'exercise',
    isCompleted: true,
  },
  {
    id: nanoid(),
    todo: 'read a book',
    isCompleted: false,
  }
]

const addTodo = (todo: string, isCompleted: boolean): Todo => {
  const newTodo: Todo = {
    id: nanoid(),
    todo: todo,
    isCompleted: isCompleted,
  }
  todos.push(newTodo);
  return newTodo;
}

export { todos, addTodo };
