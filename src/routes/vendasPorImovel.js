// Tarefa "Endpoint A — soma por imóvel" (Etapa 2, item a do enunciado)
// Passo a passo completo: cartão "Endpoint A" no Trello / Plano de Projeto.
//
// GET /api/soma-por-imovel
// Retorna, para cada imóvel, a soma de todos os pagamentos (map/filter/reduce — nunca SQL
// com WHERE/GROUP BY). Reaproveita a query de db/query_join.sql.

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // TODO: buscar todos os pagamentos, agrupar com reduce() por imóvel e devolver res.json(...)
  res.status(501).json({ erro: 'Endpoint A ainda não implementado' });
});

module.exports = router;
