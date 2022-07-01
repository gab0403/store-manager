const productsService = require('../services/productsService');
// const httpStatus = require('../helpers/httpStatusCodes');

const getProducts = async (_req, res) => {
  const productsResult = await productsService.getProducts();
    return res.status(200).json(productsResult);
};

const getProductsById = async (req, res) => {
    const { id } = req.params;
    const productsResultById = await productsService.getProductsById(id);
    if (!productsResultById || productsResultById < 1) {
      return res.status(404).json({ message: 'Product not found' });
    }
  return res.status(200).json(productsResultById[0]);
  };

const addProducts = async (req, res) => {
  const { name } = req.body;
  const productsResult = await productsService.addProducts(name);
  if (productsResult.result) {
    return res
      .status(productsResult.result.code)
      .json({ message: productsResult.result.message });
  }
  return res.status(201).json(productsResult);
};

module.exports = { getProducts, getProductsById, addProducts };