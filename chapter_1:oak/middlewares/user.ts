// deno-lint-ignore-file ban-types
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts"

export default {
  userid: async (ctx: Context, next: Function) => {
    // do whatever checks to determine the user ID
    ctx.state.userId = nanoid();
    await ctx.cookies.set("lastVisit", new Date().toISOString(), { signed: true });
    await next();
    delete ctx.state.userId; // cleanup
  }
}
