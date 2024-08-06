import express from 'express';
import { createPoll, deletePoll} from '../controllers/poll.controller.js'
import {getPoll, getPolls,getCreatedPolls,getCreatedPolls,getLikedPolls,getCommentedPolls} from '../controllers/getPoll.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, createPoll);
router.delete('/delete/:id',verifyToken, deletePoll);
router.get('get/:id', getPoll);
router.get('get/', getPolls);
router.get('/created/:userId',verifyToken, getCreatedPolls);
router.get('/answered/:userId',verifyToken, getCreatedPolls);
router.get('/liked/:userId',verifyToken, getLikedPolls);
router.get('/commented/:userId',verifyToken, getCommentedPolls);
export default router;