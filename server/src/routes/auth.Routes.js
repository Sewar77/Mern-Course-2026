import express from 'express';
import { getCurrentUser, login, logout, register } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/auth/login', login)

router.post('/auth/register', register)
router.post("/logout", logout)
router.get('/auth/me', getCurrentUser)

export default router;