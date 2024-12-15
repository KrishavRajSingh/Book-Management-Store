const jwt = require('jsonwebtoken');
const pool = require('../db'); // Import the PostgreSQL pool

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'your_jwt_secret');

            // Fetch user from the database
            const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [decoded.id]);
            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            // Attach user to the request object (exclude sensitive fields like password)
            req.user = user;
            next();
        } catch (error) {
            console.error(error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
