const express = require('express');
// const rescue = require('express-rescue');
const app = require('./app');
require('dotenv').config();
const router = require('./routers/index');

app.use(express.json());

app.use('/products', router.productsRouter);
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
