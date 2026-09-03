// teste/teste-conexao-simples.js
// Diagnóstico: testa SÓ a conexão com o MySQL, sem depender do query_join.sql
// (que pode ainda estar vazio, já que é tarefa do Integrante 2).
//
// Este arquivo espera estar dentro da pasta teste/, um nível abaixo da raiz
// do projeto. Rodar com: node teste/teste-conexao-simples.js (a partir da raiz)
// ou: node teste-conexao-simples.js (de dentro da própria pasta teste/)

const path = require('path');

// Carrega o .env da raiz do projeto, não da pasta teste/
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Sobe um nível (..) para achar src/db/connection.js
const pool = require('../src/db/connection');

async function testar() {
  console.log('Tentando conectar...');
  try {
    const [linhas] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexão com o MySQL: OK');
    console.log('Resultado do teste:', linhas[0].resultado); // deve mostrar 2
  } catch (erro) {
    console.error('Erro ao conectar:', erro.code || erro.message);
  } finally {
    await pool.end();
    console.log('Conexão encerrada.');
  }
}

testar();