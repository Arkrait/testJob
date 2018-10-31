/*
* I am really not sure how to handle private key security here, but the best solution I see is to delegate the 
* signing of a transaction to a client side via Metamask or something similar. For purposes of this being a test job I am leaving
* this server to handle signing by itself.
*/

import * as express from "express";
import bodyParser = require("body-parser");
import { Router, Request, Response } from "express";
import router from "./routes";

const app = express();
app.use(bodyParser.json());
app.use("/api", router);

app.listen(8080, "localhost");
