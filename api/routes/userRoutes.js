import express from 'express';
import {
    createUser,
    authenticateUser,
    confirmUser,
    resetPassword,
    checkToken,
    newPassword,
    account
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Autenticación, Registro y Confirmación de usuarios
router.post('/', createUser);
router.post('/login', authenticateUser);
router.get('/confirm/:token', confirmUser);
router.post('/reset-password', resetPassword);
router.route('/reset-password/:token').get(checkToken).post(newPassword);
router.get('/account', checkAuth, account);

export default router;