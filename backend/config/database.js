const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
function connection() {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(function (data) {
      console.log(`mongodb connected with the server:${data.connection.host}`);
    })
    .catch(function (err) {
      console.log(err);
    });
}
module.exports = connection;
