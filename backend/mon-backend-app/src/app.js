const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { setRoutes } = require("./routes/index");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Données en mémoire pour le développement
let colisData = [
  {
    id: 1,
    numero_suivi: "ABC123456789",
    description: "Document important",
    poids: 0.5,
    destination: "Bamako, Mali",
    date_envoi: "2025-01-15",
    utilisateur_id: 1,
    statut_id: 4,
    created_at: "2025-01-15T10:30:00Z",
    updated_at: "2025-01-15T10:30:00Z"
  },
  {
    id: 2,
    numero_suivi: "DEF987654321",
    description: "Électronique",
    poids: 2.5,
    destination: "Tombouctou, Mali",
    date_envoi: "2025-01-16",
    utilisateur_id: 1,
    statut_id: 1,
    created_at: "2025-01-16T14:20:00Z",
    updated_at: "2025-01-16T14:20:00Z"
  },
  {
    id: 3,
    numero_suivi: "GHI456789123",
    description: "Vêtements",
    poids: 1.8,
    destination: "Kayes, Mali",
    date_envoi: "2025-01-10",
    utilisateur_id: 1,
    statut_id: 5,
    created_at: "2025-01-10T09:15:00Z",
    updated_at: "2025-01-14T16:45:00Z"
  },
  {
    id: 4,
    numero_suivi: "JKL789123456",
    description: "Alimentation",
    poids: 3.2,
    destination: "Sévaré, Mali",
    date_envoi: "2025-01-17",
    utilisateur_id: 1,
    statut_id: 2,
    created_at: "2025-01-17T11:45:00Z",
    updated_at: "2025-01-17T11:45:00Z"
  },
  {
    id: 5,
    numero_suivi: "MNO123456789",
    description: "Livre",
    poids: 0.8,
    destination: "Ségou, Mali",
    date_envoi: "2025-01-18",
    utilisateur_id: 1,
    statut_id: 3,
    created_at: "2025-01-18T08:30:00Z",
    updated_at: "2025-01-18T08:30:00Z"
  }
];

// Middleware pour parser le JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
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
app.get("/api/utilisateur", (req, res) => {
  res.json([
    { id: 1, nom: "Utilisateur Test", email: "test@example.com" }
  ]);
});

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

app.get("/api/notification", (req, res) => {
  res.json([
    { id: 1, message: "Nouveau colis créé", lu: false }
  ]);
});

setRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
  console.log(`🌐 CORS configuré pour: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`);
  console.log(`💾 Mode: développement (données en mémoire)`);
  console.log(`📦 ${colisData.length} colis chargés en mémoire`);
});