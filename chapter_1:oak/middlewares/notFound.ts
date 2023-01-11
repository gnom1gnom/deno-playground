import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export default (ctx: Context) => {
  console.log(`Not found ${ctx.request.url.href}`);
  ctx.response.status = 404;
  ctx.response.body = {
    success: false,
    message: "404 - Not found.",
  };
  // response.redirect("/todos");
};
