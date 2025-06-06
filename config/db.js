const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fonction qui test la connexion
async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connexion à la base de données réussie !');
        connection.release(); 
    } catch (err) {
        console.error('Échec de la connexion à la base de données :', err.message);
        process.exit(1); 
    }
}

module.exports = {
    pool,
    testDbConnection
};