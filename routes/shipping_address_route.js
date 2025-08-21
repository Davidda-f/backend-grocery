const ShippingAddressController = require('../controllers/shipping_address_controller');
const express = require('express');
const router = express.Router();

router.post('/', ShippingAddressController.createShippingAddress);

module.exports = router;