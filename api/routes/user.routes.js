import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post("/change-password", verifyToken, changePassword);
router.get('/:username', getUser);
export default router;