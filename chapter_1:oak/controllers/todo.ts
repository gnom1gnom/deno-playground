// deno-lint-ignore-file prefer-const
// interfaces
import Todo from "../interfaces/Todo.ts";
// stubs
import { todos, addTodo } from "../stubs/todos.ts";

export default {
  /**
   * @description Get all todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: any }) => {
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
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    addTodo(body.value.todo, false);

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
    { params, response }: { params: { id: string }; response: any },
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

    // If todo is found
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  },
  /**
   * @description Update todo by id
   * @route PUT todos/:id
   */
  updateTodoById: async (
    { params, request, response }: {
      params: { id: string },
      request: any,
      response: any,
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
    const body = await request.body();
    const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
    let newTodos = todos.map((t) => {
      return t.id === params.id ? { ...t, ...updatedData } : t;
    });
    response.status = 200;
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
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const allTodos = todos.filter((t) => t.id !== params.id);

    // remove the todo w.r.t id & return
    // remaining todos
    response.status = 200;
    response.body = {
      success: true,
      data: allTodos,
    };
  },
};
