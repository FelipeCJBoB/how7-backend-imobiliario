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
