const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// User management routes
router.post('/farmers', userController.createFarmer);
router.get('/farmers', auth, userController.getFarmers);

// Trader routes
router.get('/traders', userController.getTraders);
router.post('/traders', auth, userController.createTrader);

// Protected routes
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;