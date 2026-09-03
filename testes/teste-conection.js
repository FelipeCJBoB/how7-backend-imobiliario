// teste/teste-conexao.js
// Testa a conexão executando a query do JOIN feita pelo Integrante 2
// (db/query_join.sql). Comprova o item (e) do enunciado.
//
// Este arquivo espera estar dentro da pasta teste/, um nível abaixo da raiz
// do projeto. Rodar com: node teste/teste-conexao.js (a partir da raiz)
// ou: node teste-conexao.js (de dentro da própria pasta teste/)

const fs = require('fs');
const path = require('path');

// Carrega o .env da raiz do projeto, não da pasta teste/
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Sobe um nível (..) para achar src/db/connection.js
const pool = require('../src/db/connection');

async function testar() {
  try {
    // Sobe um nível (..) para achar db/query_join.sql
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