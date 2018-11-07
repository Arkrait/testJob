/*
* I am really not sure how to handle private key security here, but the best solution I see is to delegate the 
* signing of a transaction to a client side via Metamask or something similar. For purposes of this being a test job I am leaving
* this server to handle signing by itself.
*/

import * as boot from "loopback-boot";
import * as loopback from "loopback";
import bodyParser = require("body-parser");
import router from "./routes";

const app = loopback();

app.use(bodyParser.json());
app.use("/api", router);

app.start = function() {
  return app.listen(function() {
    app.emit("started");
    const baseUrl = app.get("url").replace(/\/$/, "");
    console.log("started at %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      var explorerPath = app.get("loopback-component-explorer").mountPath;
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
