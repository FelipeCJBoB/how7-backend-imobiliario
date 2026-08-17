// Tarefa "Endpoint C — percentual por tipo" (Etapa 2, item c do enunciado)
// Passo a passo completo: cartão "Endpoint C" no Trello / Plano de Projeto.
//
// GET /api/vendas-por-tipo
// Retorna o percentual de vendas por tipo de imóvel (map/filter/reduce — nunca SQL com
// WHERE/GROUP BY). Reaproveita a query de db/query_join.sql, que já traz o tipo do imóvel.

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // TODO: somar por tipo_imovel com reduce(), calcular o percentual sobre o total e devolver res.json(...)
  res.status(501).json({ erro: 'Endpoint C ainda não implementado' });
});

module.exports = router;
