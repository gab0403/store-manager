const connection = require('../helpers/connection');

const getProducts = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
  return rows;
};

const getProductsById = async (id) => {
  const [rows] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return rows;
};

module.exports = { getProducts, getProductsById };