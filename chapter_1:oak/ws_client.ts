const ws = new WebSocket("ws://localhost:8080/wss");

ws.onopen = () => {
  console.log("Connected to server");
  ws.send(`Some message ${crypto.randomUUID()}`);
}
ws.onmessage = (m) => {
  console.log("Got message from server: ", m.data);
};
ws.onclose = () => console.log("Disconnected from server");