const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.json('Hello, Express fonctionne !');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
app.use((req, res, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);
    next();
});