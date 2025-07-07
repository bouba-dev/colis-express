const mysql = require('mysql');

console.log('🔍 Test de connexion à la base de données...');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'K@ou2021',
  database: 'gestion_colis',
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL:', err.message);
    console.log('\n🔧 Solutions possibles :');
    console.log('1. Vérifiez que MySQL est installé et démarré');
    console.log('2. Vérifiez le mot de passe dans la configuration');
    console.log('3. Créez la base de données "gestion_colis" si elle n\'existe pas');
    console.log('\n📝 Commandes MySQL utiles :');
    console.log('   - mysql -u root -p');
    console.log('   - CREATE DATABASE IF NOT EXISTS gestion_colis;');
    console.log('   - USE gestion_colis;');
    return;
  }
  
  console.log('✅ Connexion à MySQL réussie !');
  console.log('📊 Base de données: gestion_colis');
  
  // Test de requête simple
  connection.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.error('❌ Erreur lors du test de requête:', err.message);
    } else {
      console.log('✅ Test de requête réussi !');
    }
    
    connection.end();
    console.log('🔚 Connexion fermée.');
  });
}); 