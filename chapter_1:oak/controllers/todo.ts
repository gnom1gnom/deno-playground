// deno-lint-ignore-file prefer-const
import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// interfaces
import { Todo, RawTodo } from "../interfaces/Todo.ts";
// stubs
import { todos, addTodo } from "../stubs/todos.ts";

export default {
  /**
   * @description Get all todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: Response }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
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
    const rawTodo: RawTodo = await body?.value;
    addTodo(rawTodo.todo, rawTodo.isCompleted);

    response.body = {
      success: true,
      todos,
    };
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
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    // if todo found then update todo
    const body = request.body();
    const newTodo: RawTodo = await body?.value;

    let newTodos = todos.map((t) => {
      return t.id === params.id ? { ...t, ...newTodo } : t;
    });

    //response.status = 200;
    response.body = {
      success: true,
      data: newTodos,
    };
  },

  /**
   * @description Delete todo by id
   * @route DELETE todos/:id
   */
  deleteTodoById: (
    { params, response }: { params: { id: string }; response: Response },
  ) => {
    const allTodos = todos.filter((t: Todo): boolean => t.id !== params.id);

    // remove the todo w.r.t id & return
    // remaining todos
    response.status = 200;
    response.body = {
      success: true,
      data: allTodos,
    };
  },
};
