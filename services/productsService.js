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

const addProducts = async (name) => {
  if (!name) return { result: { code: 400, message: '"name" is required' } };
  if (name.length < 5) {
    return {
      result: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const productsResult = await productsModel.addProducts(name);
  return productsResult;
};

const updateProducts = async (id, name) => {
  if (!name) return { result: { code: 400, message: '"name" is required' } };
  if (name.length < 5) {
    return {
      result: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const productsResult = await productsModel.updateProducts({ id, name });
  if (productsResult.length === 0) return { result: { code: 404, message: 'Product not found' } };
  return productsResult;
};

const deleteProducts = async (id) => {
  const productsResult = await productsModel.getProductsById(id);
  if (productsResult.length === 0) return { result: { code: 404, message: 'Product not found' } };
  const deleteProductsResult = await productsModel.deleteProducts(id);
  return deleteProductsResult;
};

const searchProducts = async (name) => {
  const productsResult = await productsModel.searchProducts(name);
  if (!productsResult) return [];
  return productsResult;
};

module.exports = {
  getProducts,
  getProductsById,
  addProducts,
  updateProducts,
  deleteProducts,
  searchProducts,
};