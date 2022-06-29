const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const productsResult = await productsModel.getProducts();
  if (!productsResult) return [];
  return productsResult;
};

const getProductsById = async (id) => {
  const productsResultById = await productsModel.getProductsById(id);
  if (!productsResultById) return [];
  return productsResultById;
};

module.exports = { getProducts, getProductsById };