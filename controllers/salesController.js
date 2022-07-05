const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sales = req.body;
  const validateSale = await salesService.validateSale(sales);
  const validateProduct = await salesService.validateProduct(sales);

  if (validateSale.result) {
    return res
      .status(validateSale.result.code)
      .json({ message: validateSale.result.message });
  }
  if (validateProduct.result) {
    return res
      .status(validateProduct.result.code)
      .json({ message: validateProduct.result.message });
  }

  const response = await salesService.addProductsOnSale(req.body);
  return res.status(201).json(response);
};

module.exports = { createSale };