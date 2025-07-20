const express = require('express');
const router = express.Router();
const cpCtrl = require('../controllers/collectionPointController');
const { verifyToken } = require('../middleware/auth');

// Anyone authenticated can list all CPs or near them
router.get('/', verifyToken(), cpCtrl.listAllCP);
router.get('/nearby', verifyToken(), cpCtrl.listNearbyCP);

// Admin‑only create/update/delete
router.post('/',    verifyToken(['admin']), cpCtrl.createCP);
router.put('/:id',  verifyToken(['admin']), cpCtrl.updateCP);
router.delete('/:id', verifyToken(['admin']), cpCtrl.deleteCP);

module.exports = router;
