const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

var morgan = require("morgan");
const app = express();

// Parse Application JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
// Call Routes
var routes = require("./routes");
routes(app);

// MENU ROUTES INDEX MIDDLEWARE
app.use("/auth", require("./middleware"));

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
