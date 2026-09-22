const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = require('../src/db/connection');

async function testar() {
  try {
    const caminhoQuery = path.join(__dirname, '..', 'db', 'query_join.sql');
    const query = fs.readFileSync(caminhoQuery, 'utf8');

    const [linhas] = await pool.query(query);

    console.log('Conexão com o MySQL: OK');
    console.log('Total de linhas:', linhas.length);
    console.table(linhas.slice(0, 5));
  } catch (erro) {
    console.error('Deu erro:', erro.message);
  } finally {
    await pool.end();
  }
}

testar();
