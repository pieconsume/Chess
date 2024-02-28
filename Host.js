const { WebSocketServer } = require("ws");
const server = new WebSocketServer({ port: 6075 });
server.on("connection", ws => { console.log("new connection"); });
console.log("Hosting");