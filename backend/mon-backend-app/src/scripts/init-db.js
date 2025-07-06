const { query } = require("../config/database");

async function initDatabase() {
  try {
    console.log('🚀 Initialisation de la base de données...');

    // Créer la table colis si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS colis (
        id INT AUTO_INCREMENT PRIMARY KEY,
        numero_suivi VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        poids DECIMAL(5,2) DEFAULT 0,
        destination VARCHAR(255),
        date_envoi DATE,
        utilisateur_id INT,
        statut_id INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Créer la table statuts si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS statuts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        description TEXT,
        couleur VARCHAR(20) DEFAULT '#6B7280'
      )
    `);

    // Insérer les statuts par défaut
    await query(`
      INSERT IGNORE INTO statuts (id, nom, description, couleur) VALUES
      (1, 'en_attente', 'Colis en attente de traitement', '#F59E0B'),
      (2, 'en_cours_de_traitement', 'Colis en cours de traitement', '#F97316'),
      (3, 'pret_pour_expedition', 'Colis prêt pour l\'expédition', '#8B5CF6'),
      (4, 'en_transit', 'Colis en transit', '#3B82F6'),
      (5, 'livre', 'Colis livré', '#10B981')
    `);

    // Insérer des données de test pour les colis
    const testColis = [
      {
        numero_suivi: 'ABC123456789',
        description: 'Document important',
        poids: 0.5,
        destination: 'Bamako, Mali',
        date_envoi: '2025-01-15',
        utilisateur_id: 1,
        statut_id: 4
      },
      {
        numero_suivi: 'DEF987654321',
        description: 'Électronique',
        poids: 2.5,
        destination: 'Tombouctou, Mali',
        date_envoi: '2025-01-16',
        utilisateur_id: 1,
        statut_id: 1
      },
      {
        numero_suivi: 'GHI456789123',
        description: 'Vêtements',
        poids: 1.8,
        destination: 'Kayes, Mali',
        date_envoi: '2025-01-10',
        utilisateur_id: 1,
        statut_id: 5
      },
      {
        numero_suivi: 'JKL789123456',
        description: 'Alimentation',
        poids: 3.2,
        destination: 'Sévaré, Mali',
        date_envoi: '2025-01-17',
        utilisateur_id: 1,
        statut_id: 2
      },
      {
        numero_suivi: 'MNO123456789',
        description: 'Livre',
        poids: 0.8,
        destination: 'Ségou, Mali',
        date_envoi: '2025-01-18',
        utilisateur_id: 1,
        statut_id: 3
      }
    ];

    for (const colis of testColis) {
      await query(`
        INSERT IGNORE INTO colis (numero_suivi, description, poids, destination, date_envoi, utilisateur_id, statut_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        colis.numero_suivi,
        colis.description,
        colis.poids,
        colis.destination,
        colis.date_envoi,
        colis.utilisateur_id,
        colis.statut_id
      ]);
    }

    console.log('✅ Base de données initialisée avec succès !');
    console.log('📊 Données de test insérées :');
    console.log('   - 5 colis de test');
    console.log('   - 5 statuts différents');
    
    // Afficher les colis insérés
    const colis = await query('SELECT * FROM colis ORDER BY created_at DESC');
    console.log('\n📦 Colis disponibles :');
    colis.forEach(c => {
      console.log(`   - ${c.numero_suivi} (${c.description}) - ${c.destination}`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('🎉 Initialisation terminée !');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erreur:', error);
      process.exit(1);
    });
}

module.exports = { initDatabase }; 