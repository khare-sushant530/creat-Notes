require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const DNS = require("dns");

DNS.setDefaultResultOrder("ipv4first");

DNS.setServers(["8.8.8.8"]);

connectToDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
