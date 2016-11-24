const express = require("express");
const serveStatic = require("serve-static");
const config = require("config");

const app = express();

app.use("/", serveStatic(config.server.staticDir, {index: ["index.html"]}));

console.log(`HTTP server listening on ${config.server.port}`);
app.listen(config.server.port);
