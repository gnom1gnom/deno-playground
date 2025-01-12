import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import todoController from "../controllers/todo.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.redirect("/todos");
  //ctx.response.body = "Welcome stranger"
});

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
