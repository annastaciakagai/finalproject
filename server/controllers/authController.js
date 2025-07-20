const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../middleware/asyncHandler');
// Signup/Register (only farmer and trader)
exports.signup = async (req, res) => {
    /* similar to createFarmer/createTrader with role based on req.body.role */
    try {
        const { name, phone, password, role, locationName, produceTypes } = req.body;

        if (!['farmer', 'trader'].includes(role)) {
            return res.status(403).json({ message: "Login as Admin" });
        }

        const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const userData = { name, phone, password, role };
        if (role === 'farmer') {
            userData.locationName = locationName;
            userData.produceTypes = produceTypes;
            userData.farmerId = `VH-FA-${uuidv4().split('-')[0].toUpperCase()}`;        } else if (role === 'trader') {
            userData.locationName = locationName;
        }

        const user = await User.create(userData);

        // Issue JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login (farmers/traders by phone, admins by systemId)
exports.login = async (req, res) => {
    try {
        const { phone, password, role, systemId } = req.body;

        let user;
if (role === 'admin' || role === 'driver') {
    if (!systemId) {
        return res.status(400).json({ message: "systemId required for admin login" });
    }
    user = await User.findOne({ systemId, role }).select('+password');;
    } else if (role === 'farmer' || role === 'trader') {
        user = await User.findOne({ phone, role }).select('+password');;
    } else {
        return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.json({ user, token });    } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
exports.driverLogin = asyncHandler(async (req, res) => {
  const { systemId, password } = req.body;
  const user = await User.findOne({ systemId, role: 'driver' }).select('+password');
  if (!user) return res.status(404).json({ message: 'Driver not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user._id, name: user.name, role: user.role, systemId: user.systemId } });
});