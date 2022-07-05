const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesController.createSale);
router.delete('/:id', salesController.deleteSales);

module.exports = router;
