const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { setRoutes } = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345567890", 
  database: "gestion_colis", 
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL:", err);
    return;
  }
  console.log("Connecté à MySQL");
});

// Middleware pour parser le JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route de test
app.get("/", (req, res) => {
  res.send("Backend Node.js/Express fonctionne !");
});

setRoutes(app);

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});