// Tarefa "Endpoint B — total por mês/ano" (Etapa 2, item b do enunciado)
// Passo a passo completo: cartão "Endpoint B" no Trello / Plano de Projeto.
//
// GET /api/vendas-por-mes
// Retorna o total de vendas por mês/ano (map/filter/reduce — nunca SQL com WHERE/GROUP BY).

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // TODO: buscar todos os pagamentos, agrupar com reduce() por "MM/AAAA" e devolver res.json(...)
  res.status(501).json({ erro: 'Endpoint B ainda não implementado' });
});

module.exports = router;
