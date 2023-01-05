import { customAlphabet } from "https://deno.land/x/nanoid@v3.0.0/mod.ts"
import { nolookalikesSafe } from "npm:nanoid-dictionary";
const nanoid = customAlphabet(nolookalikesSafe, 16);

// interface
import { Todo } from '../interfaces/Todo.ts';

let todos: Todo[] = [
  {
    id: nanoid(),
    task: 'walk dog',
    isCompleted: true,
  },
  {
    id: nanoid(),
    task: 'eat food',
    isCompleted: false,
  },
  {
    id: nanoid(),
    task: 'exercise',
    isCompleted: true,
  },
  {
    id: nanoid(),
    task: 'read a book',
    isCompleted: false,
  }
]

const addTodo = (task: string, isCompleted: boolean): Todo => {
  const newTodo: Todo = {
    id: nanoid(),
    task: task,
    isCompleted: isCompleted,
  }
  todos.push(newTodo);
  return newTodo;
}

const updateTodo = (id: string, task: string, isCompleted: boolean): Todo | undefined => {
  let todo: Todo | undefined;
  todos = todos.map((t) => {
    if (t.id === id) {
      todo = { ...t, ...{ task: task, isCompleted: isCompleted } };
      return todo;
    }
    return t;
  });

  return todo;
}

const deleteTodo = (id: string): boolean => {
  let deleted = false;
  todos = todos.filter((t) => {
    if (t.id === id) {
      deleted = true;
      return false;
    }
    else return true;
  });
  return deleted;
}

export { todos, addTodo, updateTodo, deleteTodo };
