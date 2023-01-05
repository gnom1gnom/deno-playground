import { Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export default ({ response }: { response: Response }) => {
  // response.status = 404;
  // response.body = {
  //   success: false,
  //   message: "404 - Not found.",
  // };
  response.redirect("/todos");
};
