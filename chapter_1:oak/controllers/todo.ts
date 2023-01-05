import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// interfaces
import { Todo } from "../interfaces/Todo.ts";
// stubs
import { todos, addTodo, updateTodo, deleteTodo } from "../stubs/todos.ts";

export default {
  /**
   * @description Get all todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: Response }) => {
    response.status = 200;
    response.body = todos;
  },

  /**
   * @description Add a new todo
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: Request; response: Response },
  ) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    const body = request.body();
    const todo: Todo = await body?.value;
    response.body = addTodo(todo.task, todo.isCompleted);
  },

  /**
   * @description Get todo by id
   * @route GET todos/:id
   */
  getTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    //response.status = 200;
    response.body = todo;
  },

  /**
   * @description Update todo by id
   * @route PUT todos/:id
   */
  updateTodoById: async (
    { params, request, response }: {
      params: { id: string },
      request: Request,
      response: Response,
    },
  ) => {
    const body = request.body();
    const newTodo: Todo = await body?.value;

    const todo: Todo | undefined = updateTodo(params.id, newTodo.task, newTodo.isCompleted);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
    } else {
      //response.status = 200;
      response.body = todos;
    }
  },

  /**
   * @description Delete todo by id
   * @route DELETE todos/:id
   */
  deleteTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    const deleted: boolean = deleteTodo(params.id);
    if (!deleted) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
    } else {
      //response.status = 200;
      response.body = todos;
    }
  },
};
