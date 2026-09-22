const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = require('../src/db/connection');

async function testar() {
  console.log('Tentando conectar...');
  try {
    const [linhas] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexão com o MySQL: OK');
    console.log('Resultado do teste:', linhas[0].resultado);
  } catch (erro) {
    console.error('Erro ao conectar:', erro.code || erro.message);
  } finally {
    await pool.end();
    console.log('Conexão encerrada.');
  }
}

testar();
