import express from 'express';
import { createPoll, deletePoll} from '../controllers/poll.controller.js'
import { getResult } from '../controllers/result.controller.js';
import {getPoll, getPolls,getCreatedPolls,getAnsweredPolls,getLikedPolls,getCommentedPolls} from '../controllers/getPoll.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, createPoll);
router.delete('/delete/:pollId',verifyToken, deletePoll);
router.get('/get/:pollId', getPoll);
router.get('/get/', getPolls);
router.get('/created/:userId', getCreatedPolls);
router.get('/answered/:userId', getAnsweredPolls);
router.get('/liked/:userId', getLikedPolls);
router.get('/commented/:userId', getCommentedPolls);
router.get("/getResult/:pollId", getResult);
export default router;