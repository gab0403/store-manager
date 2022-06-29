const productsService = require('../services/productsService');
// const httpStatus = require('../helpers/httpStatusCodes');

const getProducts = async (_req, res) => {
  const productsResult = await productsService.getProducts();
    return res.status(200).json(productsResult);
};

const getProductsById = async (req, res) => {
    const { id } = req.params;
    const productsResultById = await productsService.getProductsById(id);
    if (!productsResultById || productsResultById.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
  return res.status(200).json(productsResultById[0]);
  };

module.exports = { getProducts, getProductsById };