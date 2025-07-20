const User = require('../models/User.js');
const Produce = require('../models/Produce.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const userController = {
  // 1. GET /farmers
  //    • admin → all farmers
  //    • driver → only farmers with available produce
  getFarmers: async (req, res) => {
    try {
      let farmers;
      if (req.user.role === 'admin') {
        farmers = await User.find({ role: 'farmer' }).lean();
      } else if (req.user.role === 'driver') {
        // find farmers who currently have supply listings
        const supplies = await Produce.find({
          intent: 'supply',
          status: 'available'
        }).distinct('user');
        farmers = await User.find({
          _id: { $in: supplies }
        }).lean();
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
      res.json(farmers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ————————————————————————————————
  // 2. POST /farmers
  //    • signup new farmer
  // ————————————————————————————————
  createFarmer: async (req, res) => {
    try {
      const { name, phone, password, locationName, produceTypes } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const farmer = await User.create({
        name,
        phone,
        password: hash,
        role: 'farmer',
        locationName,
        produceTypes,
        farmerId: `VH-FA-${uuidv4().split('-')[0].toUpperCase()}`
      });
      // optionally issue JWT
      const token = jwt.sign(
        { id: farmer._id, role: farmer.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.status(201).json({ farmer, token });
    }catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Phone number already in use' });
      }
      res.status(400).json({ error: err.message });
    }

  },

  // ————————————————————————————————
  // 3. GET /traders
  //    • admin → all traders
  //    • driver → traders with active demand listings
  // ————————————————————————————————
  getTraders: async (req, res) => {
    try {
      let traders;
      if (req.user.role === 'admin') {
        traders = await User.find({ role: 'trader' }).lean();
      } else if (req.user.role === 'driver') {
        // find traders who currently have demand listings
        const demands = await Produce.find({
          intent: 'demand',
          status: 'available'
        }).distinct('user');
        traders = await User.find({
          _id: { $in: demands }
        }).lean();
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
      res.json(traders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ————————————————————————————————
  // 4. POST /traders
  //    • signup new trader
  // ————————————————————————————————
  createTrader: async (req, res) => {
    try {
      const { name, phone, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const trader = await User.create({
        name,
        phone,
        password: hash,
        role: 'trader'
      });
      const token = jwt.sign(
        { id: trader._id, role: trader.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.status(201).json({ trader, token });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Phone number already in use' });
      }
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = userController;
