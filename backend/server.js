const app = require("./app");
const connection = require("./config/database.js");
require("dotenv").config({ path: "backend/config/.env" });

//connecting to mongodb database
connection();

app.listen(process.env.PORT, function () {
  console.log(
    `The port is started at the server http://localhost:${process.env.PORT}`
  );
});
