import express from 'express';
import { getAllUsers, login, logout, register } from '../controllers/userControllers.js';
import isAuthentication from '../middleware/isAuthentication.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/',isAuthentication,getAllUsers);


export default router;
