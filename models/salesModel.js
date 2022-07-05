const connection = require('../helpers/connection');

const addProductsOnSale = async () => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );

  return rows.insertId;
};

const addProductsSales = async (id, sales) => {
  await Promise.all(sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [id, productId, quantity],
    );
  }));
  
  return id;
};

module.exports = { addProductsOnSale, addProductsSales };