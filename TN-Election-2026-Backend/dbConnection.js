const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "ur-password😊",
  database: "e2026",
});

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        // Use pool.query instead of connection.query
        pool.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { executeQuery ,pool};
