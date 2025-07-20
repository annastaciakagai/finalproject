const Transaction = require('../models/Transaction');

exports.getTransactions = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { driver: req.user.id };
  const txns = await Transaction.find(filter)
    .populate('produce')
    .populate('seller', 'name phone')
    .populate('buyer', 'name phone')
    .lean();
  res.json(txns);
});

