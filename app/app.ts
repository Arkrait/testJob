/*
 * I am really not sure how to handle private key security here, but the best solution I see is to delegate the
 * signing of a transaction to a client side via Metamask or something similar. For purposes of this being a test job I am leaving
 * this server to handle signing by itself.
 */

import * as boot from "loopback-boot";
import * as loopback from "loopback";
import bodyParser = require("body-parser");
import router from "./routes";
const explorer = require("loopback-component-explorer");

const app = loopback();

explorer(app, { basePath: "/api", mountPath: "/explorer" });

app.use(bodyParser.json());
app.use("/api", router);
app.use("/explorer", explorer.routes(app, { basePath: "/api" }));

app.start = function() {
  return app.listen(function() {
    app.emit("started");
    const baseUrl = app.get("url").replace(/\/$/, "");
    console.log("started at %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      const explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;

  if (require.main === module) {
    app.start();
  }
});
