const mysql = require("mysql2");
const password_segretissima =
  process.env.PASSWORD_CHE_AVREI_DOVUTO_NASCONDERE_20_COMMIT_FA;
const user_segretissimo = process.env.USER;
const host_segretissimo = process.env.HOST;
const database_segretissimo = process.env.DATABASE;

const connection = mysql.createConnection({
  host: host_segretissimo,
  user: user_segretissimo,
  password: password_segretissima,
  database: database_segretissimo,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

module.exports = connection;
