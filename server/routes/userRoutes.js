const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//farmer
router.post('/farmers', userController.createFarmer);
router.get('/farmers', verifyToken(['admin', 'driver']), userController.getFarmers);

//Trader
router.get('/traders', userController.getTraders);
router.post('/traders',verifyToken(['admin', 'driver']), userController.createTrader);

router.post('/driver-login', authController.driverLogin);
module.exports = router;