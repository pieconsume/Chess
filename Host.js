function bothconnected() { client1.send("-opconnected"); client2.send("-opconnected"); if(!gamestarted) { client1.send("-select"); client2.send("-opselect"); } }
function processmsg(msg, host){
 console.log(msg.toString());
 if (msg.toString().startsWith("-select") && host){
  gamestarted = true;
  let side = msg.split(" ")[1];
  client1.send("-pick " + side == "white" ? "black" : "white"); }
 else if (host && client2 != null) { client2.send(msg.toString()); }
 else if (client1 != null)         { client1.send(msg.toString()); } }
const { WebSocketServer } = require("ws");
const server = new WebSocketServer({ port: 6075 });
let client1, client2;
let client1white = null, gamestarted = false, whiteturn = true;
server.on("connection", client => {
 if      (client1 == null){
  console.log("client1 connected");
  client1 = client;
  client1.on("message", (msg) => { processmsg(msg, true); });
  client1.on("close", () => { if (client2 != null) { client2.send("-oplostcon"); } client1 = null; });
  if (client2 != null)      { bothconnected(); } }
 else if (client2 == null){ 
  console.log("client2 connected");
  client2 = client;
  client2.on("message", (msg) => { processmsg(msg, false); });
  client2.on("close", () => { if (client1 != null) { client1.send("-oplostcon"); } client2 = null; }); 
  if (client1 != null)      { bothconnected(); } }
 else { console.log("blocked extra client"); }
 });
console.log("Hosting");