const mysql = require("mysql2");
const password_segretissima =
  process.env.PASSWORD_CHE_AVREI_DOVUTO_NASCONDERE_20_COMMIT_FA;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password_segretissima,
  database: "149_blog_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

module.exports = connection;
