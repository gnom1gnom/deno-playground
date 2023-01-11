
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const socket = new Router()
  .get("/wss", (ctx) => {
    if (!ctx.isUpgradable) {
      console.error(`Connection non-upgradable`);
      ctx.throw(501);
    }
    const ws = ctx.upgrade();
    ws.onopen = () => {
      console.log("Connected to client");
      ws.send("Hello from server!");
    };
    ws.onmessage = (m) => {
      console.log("Got message from client: ", m.data);
      ws.send(m.data as string);
      ws.close();
    };
    ws.onclose = () => console.log("Disconncted from client");
  });

export default socket;