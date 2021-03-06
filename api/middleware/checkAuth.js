import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('_id name email');
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Hubo un error' });
        }
    }

    if (!token) {
        const error = new Error('Token invalido');
        return res.status(401).json({ message: error.message });
    }

    next();
}

export default checkAuth;