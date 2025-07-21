const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../middleware/asyncHandler');

// Register/Signup (only farmer and trader)
exports.register = async (req, res) => {
  try {
    const { 
      name, 
      phone, 
      password, 
      role, 
      locationName, 
      produceTypes, 
      businessName, 
      businessType, 
      email 
    } = req.body;

    // Validate role
    if (!['farmer', 'trader'].includes(role)) {
      return res.status(403).json({ message: "Only farmers and traders can register through this endpoint" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Prepare user data
    const userData = { 
      name, 
      phone, 
      password, 
      role 
    };

    // Add role-specific fields
    if (role === 'farmer') {
      userData.locationName = locationName;
      userData.produceTypes = produceTypes || [];
      userData.farmerId = `VH-FA-${uuidv4().split('-')[0].toUpperCase()}`;
    } else if (role === 'trader') {
      userData.locationName = locationName;
      userData.businessName = businessName;
      userData.businessType = businessType;
      userData.email = email;
    }

    // Create user (password will be hashed by pre-save middleware)
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        ...(role === 'farmer' && { farmerId: user.farmerId }),
        ...(role === 'trader' && { email: user.email })
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Phone number already registered" });
    }
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

// Login (farmers/traders by phone, admins by systemId)
exports.login = async (req, res) => {
  try {
    const { phone, password, role, systemId } = req.body;

    // Validate required fields
    if (!password || !role) {
      return res.status(400).json({ message: "Password and role are required" });
    }

    let user;
    
    // Find user based on role
    if (role === 'admin' || role === 'driver') {
      if (!systemId) {
        return res.status(400).json({ message: "System ID is required for admin/driver login" });
      }
      user = await User.findOne({ systemId, role }).select('+password');
    } else if (role === 'farmer' || role === 'trader') {
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
      }
      user = await User.findOne({ phone, role }).select('+password');
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        ...(user.systemId && { systemId: user.systemId }),
        ...(user.farmerId && { farmerId: user.farmerId }),
        ...(user.email && { email: user.email })
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};