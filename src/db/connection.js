// src/db/connection.js
// Responsável: Integrante 3
//
// Cria e exporta um pool de conexões com o MySQL, usando as credenciais
// definidas no arquivo .env (nunca deixe essas credenciais direto no código).

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;