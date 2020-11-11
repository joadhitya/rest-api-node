var mysql = require("mysql");

// Create Connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodexreact",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

module.exports = conn;
