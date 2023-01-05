// deno-lint-ignore-file ban-types
import {
  green,
  cyan,
  white,
  bgRed,
} from "https://deno.land/std@0.53.0/fmt/colors.ts";

import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const X_RESPONSE_TIME = "X-Response-Time";

export default {
  logger: async (
    { response, request }: { response: Response, request: Request },
    next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    console.log(`${green(request.method)} ${cyan(request.url.pathname)}`);
    console.log(`${bgRed(white(String(responseTime)))}`);
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
