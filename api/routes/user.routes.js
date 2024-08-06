import express from 'express';
import {updateUser, deleteUser, getUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.get('/:username', getUser);
export default router;