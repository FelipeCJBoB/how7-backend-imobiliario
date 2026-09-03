// src/server.js
// Responsável: Integrante 3
//
// Bootstrap do servidor Express. Cada integrante registra a rota do seu
// endpoint aqui — essa é a única linha do arquivo que é compartilhada.
// Ninguém edita o arquivo de rota/controller de outro integrante.

require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota simples só para confirmar que o servidor está de pé
app.get('/', (req, res) => {
  res.json({ status: 'ok', servico: 'how7-backend-imobiliario' });
});

// ---- Registro das rotas de cada integrante ----
// Cada um descomenta/acrescenta a sua linha aqui quando o endpoint estiver pronto:
//
// const vendasPorImovel = require('./routes/vendasPorImovel'); // Integrante 1
// app.use('/api/soma-por-imovel', vendasPorImovel);
//
// const vendasPorMes = require('./routes/vendasPorMes'); // Integrante 2
// app.use('/api/vendas-por-mes', vendasPorMes);
//
// const vendasPorTipo = require('./routes/vendasPorTipo'); // Integrante 5
// app.use('/api/vendas-por-tipo', vendasPorTipo);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});