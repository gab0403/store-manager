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

const getSales = async (req, res) => {
  const resultSales = await salesService.getSales();
  if (resultSales.result) {
    return res
      .status(resultSales.result.code)
      .json({ message: resultSales.result.message });
  }
  return res.status(200).json(resultSales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const resultSales = await salesService.getSalesById(id);
  if (resultSales.result) {
    return res
      .status(resultSales.result.code)
      .json({ message: resultSales.result.message });
  }
  return res.status(200).json(resultSales);
};
  
module.exports = { createSale, getSales, getSalesById };