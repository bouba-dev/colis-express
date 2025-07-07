const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const utilisateurRoutes = require("./routes/utilisateur");
const { initAdmin } = require("./utils/initAdmin");

const app = express();
const PORT = process.env.PORT || 3000;
// const cors = require("cors");

// app.use(cors({
//   origin: "http://localhost:3000", // adresse de ton frontend Next.js
//   credentials: true
// }));


// Données en mémoire pour le développement
let colisData = [
  {
    id: 1,
    numero_suivi: "CE123456789",
    nom_destinataire: "Jean Dupont",
    telephone_destinataire: "+223 76 12 34 56",
    adresse_destinataire: "123 Rue de la Paix, Bamako",
    type_colis: "Document",
    poids: 0.5,
    valeur: 25,
    photo_url: null,
    montant: 15000,
    moyen_paiement: "Espèces",
    utilisateur_id: 1,
    statut_id: 1,
    date_envoi: "2025-01-15",
    created_at: "2025-01-15T10:30:00Z",
    updated_at: "2025-01-15T10:30:00Z"
  }
];

// Middleware pour parser le JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3001", // adresse de ton frontend Next.js
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true
}));

// Route de test
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Node.js/Express fonctionne !",
    timestamp: new Date().toISOString(),
    mode: "development (données en mémoire)",
    endpoints: {
      colis: "/api/colis",
      utilisateurs: "/api/utilisateur",
      tarifs: "/api/tarif",
      statuts: "/api/statut"
    }
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenue sur l’API Colis Express",
    endpoints: [
      "/api/colis",
      "/api/utilisateur",
      "/api/tarif",
      "/api/statut"
    ]
  });
});

// Routes API pour les colis (en mémoire)
app.get("/api/colis", (req, res) => {
  console.log("📦 Récupération de tous les colis");
  res.json(colisData);
});

app.get("/api/colis/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colis = colisData.find(c => c.id === id);
  
  if (!colis) {
    return res.status(404).json({ 
      message: "Colis non trouvé",
      id: req.params.id 
    });
  }
  
  console.log(`📦 Récupération du colis ${id}`);
  res.json(colis);
});

app.post("/api/colis", (req, res) => {
  const newColis = {
    id: colisData.length + 1,
    numero_suivi: `CE${Date.now()}${Math.floor(Math.random() * 1000)}`,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  colisData.push(newColis);
  console.log(`📦 Création du colis ${newColis.numero_suivi}`);
  
  res.status(201).json({
    message: "Colis créé avec succès",
    data: newColis
  });
});

app.put("/api/colis/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = colisData.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ 
      message: "Colis non trouvé",
      id: req.params.id 
    });
  }
  
  colisData[index] = {
    ...colisData[index],
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  console.log(`📦 Mise à jour du colis ${id}`);
  res.json({
    message: "Colis mis à jour avec succès",
    data: colisData[index]
  });
});

app.delete("/api/colis/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = colisData.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ 
      message: "Colis non trouvé",
      id: req.params.id 
    });
  }
  
  const deletedColis = colisData.splice(index, 1)[0];
  console.log(`📦 Suppression du colis ${id}`);
  
  res.json({
    message: "Colis supprimé avec succès",
    data: deletedColis
  });
});

// Routes pour les autres entités (simulées)
app.use("/api/utilisateur", utilisateurRoutes);

app.get("/api/tarif", (req, res) => {
  res.json([
    { id: 1, destination: "Bamako", prix: 15000 },
    { id: 2, destination: "Tombouctou", prix: 25000 }
  ]);
});

app.get("/api/statut", (req, res) => {
  res.json([
    { id: 1, nom: "en_attente", description: "En attente" },
    { id: 2, nom: "en_cours_de_traitement", description: "En cours de traitement" },
    { id: 3, nom: "pret_pour_expedition", description: "Prêt pour l'expédition" },
    { id: 4, nom: "en_transit", description: "En transit" },
    { id: 5, nom: "livre", description: "Livré" }
  ]);
});
initAdmin();

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
  console.log(`🎯 Mode: development (données en mémoire)`);
});