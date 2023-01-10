// deno-lint-ignore-file ban-types
import {
  blue,
  green,
  cyan,
  white,
  bgRed,
} from "https://deno.land/std@0.53.0/fmt/colors.ts";

import { Cookies, Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { AppState } from "../interfaces/AppState.ts";

const X_RESPONSE_TIME = "X-Response-Time";

export default {
  logger: async ({ state, cookies, request, response }: { state: AppState, cookies: Cookies, request: Request, response: Response }, next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    const lastVisit = await cookies.get("lastVisit");
    console.log(`${green(request.method)} ${cyan(request.url.pathname)}`);
    console.log(`${bgRed(white(String(responseTime)))}`);
    console.log(`Userid: ${blue(state.userId || "")}`);
    console.log(`lastVisit: ${blue(lastVisit || "")}`);
  },
  responseTime: async (
    { response }: { response: Response },
    next: Function,
  ) => {
    const start = Date.now();
    await next();
    const ms: number = Date.now() - start;
    response.headers.set(X_RESPONSE_TIME, `${ms}ms`)
  },
};
