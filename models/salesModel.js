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

const getSales = async () => {
  const [rows] = await connection.execute(
    `SELECT S.id as saleId, S.date, SP.product_id as productId, SP.quantity 
        FROM StoreManager.sales as S
        INNER JOIN StoreManager.sales_products as SP
        ON S.id = SP.sale_id
        ORDER BY S.id ASC, SP.product_id
      `,
  );

  return rows;
};

const getSalesById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT S.date, SP.product_id as productId, SP.quantity
        FROM StoreManager.sales as S
        INNER JOIN StoreManager.sales_products as SP
        ON S.id = SP.sale_id
        WHERE S.id = ?
        ORDER BY S.id ASC, SP.product_id
      `,
    [id],
  );

  return rows;
};

const deleteSales = async (id) => {
  const [rows] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return rows;
};

module.exports = { addProductsOnSale, addProductsSales, getSales, getSalesById, deleteSales };