import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { bgGreen } from "https://deno.land/std@0.53.0/fmt/colors.ts";
const ws = new WebSocket("ws://localhost:8080/wss");

ws.onopen = () => {
  console.log(`${bgGreen("Connected to server")}`);

  const msg = `Dummy message ${nanoid()}`;
  console.log(`>> ${msg}`);

  ws.send(msg);
}
ws.onmessage = (msg) => {
  console.log("Server says: ", msg.data);
};
ws.onclose = () => console.log(`${bgGreen("Disconnected from server")}`);