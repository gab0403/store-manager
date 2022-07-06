const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/search', productsController.searchProducts);
router.get('/', productsController.getProducts);
router.post('/', productsController.addProducts);
router.get('/:id', productsController.getProductsById);
router.put('/:id', productsController.updateProducts);
router.delete('/:id', productsController.deleteProducts);

module.exports = router;
