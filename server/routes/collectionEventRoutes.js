const express = require('express');
const router  = express.Router();
const eventCtrl  = require('../controllers/collectionEventController');
const transactionController  = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/auth');

// CollectionEvent endpoints
router.post('/', verifyToken(['driver']), eventCtrl.scheduleCollection);
router.put('/:id', verifyToken(['driver', 'admin']), ceCtrl.updateCollectionStatus);
router.get('/', verifyToken(['driver', 'admin']), ceCtrl.getMyCollections);
router.delete('/:id', verifyToken(['driver', 'admin']), ceCtrl.cancelCollection);

// Transaction endpoints
router.get('/transactions', verifyToken(['driver','admin']), transactionController.getTransactions);

module.exports = router;