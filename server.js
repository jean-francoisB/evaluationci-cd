require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Importe ton module de base de données
const db = require('./config/db');

// Importe tes routes d'articles
const articleRoutes = require('./routes/articleRoutes'); 

app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('ça fonctionne !!!');
});

// =========================================================
//ROUTES ARTICLES
// =========================================================

app.use('/api', articleRoutes);


// Démarrage serveur et test connexion BDD
async function startServer() {
    await db.testDbConnection(); 

    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
        console.log(`Lien : http://localhost:${PORT}`);
        
        console.log(`Endpoints de l'API : http://localhost:${PORT}/api/articles`);
        console.log(`Endpoint pour un article spécifique : http://localhost:${PORT}/api/articles/:id`);
    });
}

startServer();