const connection = require('../helpers/connection');

const addProductsOnSale = async (productId, quantity) => {
  const [rows] = await connection.execute(
  'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUES(?, ?)',
    [productId, quantity],
  );
  const result = {
    productId: rows.insertId,
    quantity,
  };
  return result;
};

module.exports = { addProductsOnSale };