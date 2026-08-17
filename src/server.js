const express = require('express');
require('dotenv').config();

const vendasPorImovel = require('./routes/vendasPorImovel');
const vendasPorMes = require('./routes/vendasPorMes');
const vendasPorTipo = require('./routes/vendasPorTipo');

const app = express();

app.use('/api/soma-por-imovel', vendasPorImovel);
app.use('/api/vendas-por-mes', vendasPorMes);
app.use('/api/vendas-por-tipo', vendasPorTipo);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
