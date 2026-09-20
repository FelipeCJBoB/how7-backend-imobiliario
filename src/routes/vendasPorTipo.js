// GET /api/vendas-por-tipo — tarefa "Endpoint C" (Integrante 5, Etapa 2).
// Passo a passo completo: cartões [E2] da sua lista no Trello.
//
// O que este arquivo precisa fazer:
//   1. Criar um Router do Express
//   2. Chamar o TipoImovelController, que faz o cálculo
//   3. Responder o resultado em JSON com status 200, e 500 em caso de erro
//   4. Exportar o router com module.exports
//
// A lógica de cálculo fica no controller, não aqui.
// Alimenta o gráfico de pizza.
const express = require('express');
const TipoImovelController = require('../controllers/TipoImovelController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resultado = await TipoImovelController.percentualPorTipo();
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;