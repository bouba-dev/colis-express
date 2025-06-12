const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345567890", // Mets ton mot de passe ici
  database: "gestion_colis", // Mets le nom de ta base ici
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connexion MySQL réussie !");
});

module.exports = db;