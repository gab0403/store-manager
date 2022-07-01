const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getProducts);
router.post('/', productsController.addProducts);
router.get('/:id', productsController.getProductsById);

module.exports = router;
