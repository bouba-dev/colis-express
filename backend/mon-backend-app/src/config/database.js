const mysql = require('mysql');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'K@ou2021',
    database: process.env.DB_NAME || 'gestion_colis',
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4',
    timezone: '+00:00'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err.message);
        console.error('Vérifiez que MySQL est démarré et que les paramètres de connexion sont corrects.');
        return;
    }
    console.log('✅ Connexion à MySQL réussie !');
    console.log(`📊 Base de données: ${dbConfig.database}`);
});

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                console.error('❌ Erreur de requête SQL:', err.message);
                return reject(err);
            }
            resolve(results);
        });
    });
};

const closeConnection = () => {
    connection.end((err) => {
        if (err) {
            console.error('❌ Erreur lors de la fermeture de la connexion:', err.message);
        } else {
            console.log('✅ Connexion à la base de données fermée.');
        }
    });
};

module.exports = {
    connection,
    query,
    closeConnection,
    dbConfig
};