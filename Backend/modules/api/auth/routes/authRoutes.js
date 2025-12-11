import express from 'express';
import { Login, Register } from '../controller/authController.js';

const userRoutes = express.Router();

userRoutes.post('/register', Register);
userRoutes.post('/login', Login);

export default userRoutes;
