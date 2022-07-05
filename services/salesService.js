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

module.exports = { addProductsOnSale, validateSale, validateProduct };