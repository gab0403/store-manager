const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const addProductsOnSale = async (sales) => {
  const result = await salesModel.addProductsOnSale();
  return {
    id: result,
    itemsSold: sales,
  };
};

const validateSale = async (sales) => {
  if (sales.some(({ quantity }) => quantity <= 0)) {
    return { result: { code: 422, message: '"quantity" must be greater than or equal to 1' } };
  }

  if (sales.some((sale) => !sale.productId)) {
    return { result: { code: 400, message: '"productId" is required' } };
  }

  if (sales.some((sale) => !sale.quantity)) {
    return { result: { code: 400, message: '"quantity" is required' } };
  }

   return [];
};

const validateProduct = async (sales) => {
  const productsResult = await productsModel.getProducts();
  const haveId = productsResult.map((element) => element.id);
  if (sales.some(({ productId }) => !haveId.includes(productId))) {
    return { result: { code: 404, message: 'Product not found' } };
  }
  return [];
};

const getSales = async () => {
  const result = await salesModel.getSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (result.length === 0) {
    return { result: { code: 404, message: 'Sale not found' } };
  }
  return result;
};

const deleteSales = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (result.length === 0) {
    return { result: { code: 404, message: 'Sale not found' } };
  }
  const deleteSaleResult = await salesModel.deleteSales(id);
  return deleteSaleResult;
};

const updateSales = async (id, sales) => { 
  const validateId = await salesModel.getSalesById(id);
  if (validateId.length === 0) {
    return { result: { code: 404, message: 'Sale not found' } };
  }

  const updateSalesResult = await salesModel.updateSales(id, sales);
  return {
    saleId: updateSalesResult,
    itemsUpdated: sales,
  };
};

module.exports = {
  addProductsOnSale,
  validateSale,
  validateProduct,
  getSales,
  getSalesById,
  deleteSales,
  updateSales,
};