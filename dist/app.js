"use strict";
/*
* I am really not sure how to handle private key security here, but the best solution I see is to delegate the
* signing of a transaction to a client side via Metamask or something similar. For purposes of this being a test job I am leaving
* this server to handle signing by itself.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const app = express();
app.use(bodyParser.json());
app.use(routes_1.default);
app.listen(8080, "localhost");
//# sourceMappingURL=app.js.map