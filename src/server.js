require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', servico: 'how7-backend-imobiliario' });
});

const vendasPorImovel = require('./routes/vendasPorImovel');
app.use('/api/soma-por-imovel', vendasPorImovel);
const vendasPorMes = require('./routes/vendasPorMes');
app.use('/api/vendas-por-mes', vendasPorMes);
const vendasPorTipo = require('./routes/vendasPorTipo');
app.use('/api/vendas-por-tipo', vendasPorTipo);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
