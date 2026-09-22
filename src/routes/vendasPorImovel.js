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
