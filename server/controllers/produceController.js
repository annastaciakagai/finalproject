const Produce = require('../models/Produce');
// const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Get all produce (optionally filter by type, intent, status, user)
exports.getProduce = async (req, res) => {
    try {
        const { type, intent, status, user } = req.query;
        const filter = {};
        if (type) filter.type = type;
        if (intent) filter.intent = intent;
        if (status) filter.status = status;
        if (user) filter.user = user;

         // lean() + select user fields (excluding password)
        const listings = await Produce.find(filter)
            .populate('user', 'name phone role')
            .lean();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new produce
exports.createProduce = async (req, res) => {
    try {
        const data = {...req.body, user:req.user.id};
        // Role check: only farmers can post supply, traders can post demand
        if (data.intent === 'supply' && req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can supply produce' });
        }
        if (data.intent === 'demand' && req.user.role !== 'trader') {
            return res.status(403).json({ message: 'Only traders can request produce' });
        }
        const produce = await Produce.create(data);
        res.status(201).json(produce);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get single produce by ID
exports.getProduceById = async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id).populate('user', 'name phone role').lean();
        if (!produce) return res.status(404).json({ message: 'Produce not found' });
        res.json(produce);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update produce by ID
exports.updateProduce = async (req, res) => {
    try {
        // Only the owner (or admin) can update
        const listing = await Produce.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Produce not found' });
        if (listing.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this listing' });
  }
  const updated = await Produce.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete produce by ID
exports.deleteProduce = async (req, res) => {
    try {
        const listing = await Produce.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Produce not found' });
        if (listing.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }
        await listing.remove();
        res.json({ message: 'Produce deleted' });    
        } catch (err) {
        res.status(500).json({ error: err.message });
    }
};