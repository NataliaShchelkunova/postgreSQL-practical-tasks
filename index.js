const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/models");
const port = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

require("./src/routes/index")(app);
db.sequelize.sync();

app.listen(port, () => {
  console.log("Example app listening on " + port);
});
