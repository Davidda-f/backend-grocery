const UserController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware.authMiddleware, UserController.getUser);
module.exports = router;