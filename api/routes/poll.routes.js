import express from 'express';
import { createPoll, deletePoll, getPoll, getPolls} from '../controllers/poll.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, createPoll);
router.delete('/delete/:id',verifyToken, deletePoll);
router.get('get/:id', getPoll);
router.get('get/', getPolls);

export default router;