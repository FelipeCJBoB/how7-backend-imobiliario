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
