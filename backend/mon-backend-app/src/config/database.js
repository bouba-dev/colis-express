const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: '12345567890',
    database: 'your_database_name'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;