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

const addProducts = async (name) => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    id: rows.insertId,
    name,
  };
  return result;
  };

module.exports = { getProducts, getProductsById, addProducts };