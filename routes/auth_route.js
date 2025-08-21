const AuthController = require('../controllers/auth_controller');
const express = require('express');
const router = express.Router();

router.post('/google-login', AuthController.googleLogin);

module.exports = router;