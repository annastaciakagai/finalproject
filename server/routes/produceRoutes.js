const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');
const { verifyToken } = require('../middleware/auth');

router.get('/', produceController.getProduce);
router.get('/:id', produceController.getProduceById);

//protected
router.post('/', verifyToken(['farmer', 'trader']), produceController.createProduce);

router.put('/:id', verifyToken(['farmer', 'trader','admin']), produceController.updateProduce);
router.delete('/:id', verifyToken(['farmer', 'trader', 'admin']), produceController.deleteProduce);

module.exports = router;