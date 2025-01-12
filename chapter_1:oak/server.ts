import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { AppState } from "./interfaces/AppState.ts";
import { green, yellow } from "https://deno.land/std@0.171.0/fmt/colors.ts";

// include to enable flash server
// import {
//   FlashServer,
//   hasFlash,
// } from "https://deno.land/x/oak@v11.1.0/mod.ts";

// const appOptions = hasFlash() ? { serverConstructor: FlashServer } : undefined;

// include to enable cookie signing 
const appOptions = { keys: ["secretForCookieSign"] };

// state
import user from "./middlewares/user.ts"

// routes
import todoRouter from "./routes/todo.ts";
import nestedRouter from "./routes/nested.ts";
import sockets from "./routes/sockets.ts"

// logger
import logger from './middlewares/logger.ts';
// not found
import notFound from './middlewares/notFound.ts';

const app = new Application<AppState>(appOptions);
const port = 8080;

app.use(user.userid);

// order of execution is important;
app.use(logger.logger);
app.use(logger.responseTime);

app.use(nestedRouter.routes());
app.use(nestedRouter.allowedMethods());

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.use(sockets.routes());
app.use(sockets.allowedMethods());


// 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

await app.listen({ port });
