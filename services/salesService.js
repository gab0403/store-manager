const salesModel = require('../models/salesModel');

const addProductsOnSale = async (productId, quantity) => {
  const salesResult = await salesModel.addProductsOnSale(productId, quantity);
  return salesResult;
};

module.exports = { addProductsOnSale };