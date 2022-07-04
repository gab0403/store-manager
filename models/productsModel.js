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
  
const updateProducts = async ({ id, name }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return rows;
};

const deleteProducts = async (id) => {
  await connection.execute(
   'SELECT * FROM StoreManager.products WHERE id = ?',
   [id],
  );
  
const [rows] = await connection.execute(
  `DELETE FROM StoreManager.products
    WHERE id = ?`,
  [id],
);
  return rows;
};

module.exports = { getProducts, getProductsById, addProducts, updateProducts, deleteProducts };