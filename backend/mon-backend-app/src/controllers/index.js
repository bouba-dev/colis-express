class IndexController {
  constructor() {
    // Initialisation si nécessaire
  }

  getHome(req, res) {
    res.send("Bienvenue sur l'application backend!");
  }

  // Ajoutez d'autres méthodes pour gérer les routes ici
}

module.exports = {
  hello: (req, res) => {
    res.send("Hello depuis le contrôleur !");
  }
};