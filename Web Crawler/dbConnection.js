const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "Ramana123@",
  database: "elec2023",
});

module.exports = pool;
