const OrderController = require('../controllers/order_controller');
const express = require('express');
const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/:userId', OrderController.getOrder);

module.exports = router;