fetch("http://localhost:5000/data") 
 .then(response => response.json())
  .then(data => console.log("Données reçues :", data))
  .catch(error => console.error("Erreur :", error));