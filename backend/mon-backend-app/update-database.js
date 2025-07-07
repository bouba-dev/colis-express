const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function updateDatabase() {
  let connection;
  
  try {
    // Configuration de la base de données
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'K@ou2021',
      database: process.env.DB_NAME || 'colis_express',
      multipleStatements: true
    };

    console.log('🔌 Connexion à la base de données...');
    connection = await mysql.createConnection(config);
    console.log('✅ Connexion réussie');

    // Lire le script SQL
    const sqlPath = path.join(__dirname, 'src/scripts/update_colis_table.sql');
    const sqlScript = await fs.readFile(sqlPath, 'utf8');
    
    console.log('📝 Exécution du script de mise à jour...');
    await connection.execute(sqlScript);
    console.log('✅ Base de données mise à jour avec succès');

    // Vérifier la structure de la table
    const [columns] = await connection.execute('DESCRIBE colis');
    console.log('📋 Structure de la table colis:');
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''}`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connexion fermée');
    }
  }
}

// Exécuter le script
updateDatabase(); 