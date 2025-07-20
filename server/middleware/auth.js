// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * verifyToken(allowedRoles)
 * @param {string[]} allowedRoles  — if non‑empty, only allow users whose role appears in this array
 */
export const verifyToken = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // 1. Grab the token from the header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: 'No token provided' });

      const token = authHeader.split(' ')[1];

      // 2. Verify & decode
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // e.g. payload = { id: 'userId', role: 'driver', iat: ..., exp: ... }

      // 3. Optionally enforce role-based access
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // 4. (Optional) Fetch full user record & attach to req.user
      //     Or just attach the payload if you don’t need DB lookups here
      const user = await User.findById(payload.id).select('-password');
      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = user;
      next();
    } catch (err) {
      console.error('Auth error:', err);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
