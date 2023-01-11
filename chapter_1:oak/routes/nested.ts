import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const posts = new Router()
  .get("/", (ctx) => {
    console.log(`post root route`);
    ctx.response.body = `Forum: ${ctx.params.forumId}`;
  })
  .get("/:postId", (ctx) => {
    console.log(`postId route`);
    ctx.response.body = `Forum: ${ctx.params.forumId}, Post: ${ctx.params.postId}`;
  });

const forums = new Router()
  // deno-lint-ignore no-unused-vars
  .use("/forums/:forumId/posts", (ctx, next) => { console.log(`forum router`); next() }, posts.routes(), posts.allowedMethods());

export default forums;