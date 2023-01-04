import { v5 } from "https://deno.land/std/uuid/mod.ts";
// interface
import Todo from '../interfaces/Todo.ts';

const NAMESPACE_URL = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

let todos: Todo[] = [
  {
    id: await v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org")),
    todo: 'walk dog',
    isCompleted: true,
  },
  {
    id: await v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org")),
    todo: 'eat food',
    isCompleted: false,
  },
  {
    id: await v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org")),
    todo: 'exercise',
    isCompleted: true,
  },
  {
    id: await v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org")),
    todo: 'read a book',
    isCompleted: false,
  }
];

export {todos, NAMESPACE_URL};
