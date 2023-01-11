
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { bgBlue } from "https://deno.land/std@0.53.0/fmt/colors.ts";

const socket = new Router()
  .get("/wss", (ctx) => {
    if (!ctx.isUpgradable) {
      console.error(`Connection non-upgradable`);
      ctx.throw(501);
    }
    const ws = ctx.upgrade();
    ws.onopen = () => {
      console.log(`${bgBlue("Connected to client")}`);
      ws.send("Hello!");
    };
    ws.onmessage = (msg) => {
      console.log("Client says: ", msg.data);

      const reply = `Dummy reply ${nanoid()}`;
      console.log(`>> ${reply}`);

      ws.send(reply);
      ws.close();
    };
    ws.onclose = () => console.log(`${bgBlue("Disconnected from client")}`);
  });

export default socket;