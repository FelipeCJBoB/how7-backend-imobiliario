// GET /api/vendas-por-mes — tarefa "Endpoint B" (Integrante 2, Etapa 2).

// A lógica de cálculo fica no controller, não aqui.
// Alimenta o gráfico de linhas.

const express = require('express');

const VendaMensalController = require('../controllers/VendaMensalController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resultado = await VendaMensalController.vendasPorMes();
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;