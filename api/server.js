// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/artists", (req, res) => {
  res.jsonp(req.query);
});

server.get("/records", (req, res) => {
  res.jsonp(req.query);
});

server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running");
});
