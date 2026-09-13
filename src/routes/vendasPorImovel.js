// GET /api/soma-por-imovel — tarefa "Endpoint A" (Integrante 1, Etapa 2).
// Passo a passo completo: cartões [E2] da sua lista no Trello.
//
// A lógica de cálculo fica no controller, não aqui.
// Alimenta o gráfico de barras.

const express = require('express');
const ImovelController = require('../controllers/ImovelController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resultado = await ImovelController.somaPorImovel();
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;
