function processmsg(msg, host){
 if (msg.startsWith(-)){
  }
 else if (host && client2 != null) { client2.send(msg); }
 else if (client1 != null) { client1.send(msg); }
 }
const { WebSocketServer } = require("ws");
const server = new WebSocketServer({ port: 6075 });
let client1, client2;
let client1white = null, gamestarted = false, whiteturn = true;
server.on("connection", client => {
 if      (client1 == null){
  console.log("client1 connected");
  client1 = client;
  client1.on("message", (msg) => { processmsg(msg, true); }); 
  client1.on("close", () => { client1 = null; }); }
 else if (client2 == null){ 
  console.log("client2 connected");
  client2 = client;
  client2.on("message", (msg) => { processmsg(msg, false); }); 
  client2.on("close", () => { client2 = null; }); }
 else { console.log("blocked extra client"); }
 });
console.log("Hosting");