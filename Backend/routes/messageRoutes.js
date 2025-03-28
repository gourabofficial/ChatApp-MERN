import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { getMessages, sendMessage } from "../controllers/messageControllers.js";

const router = express.Router();

router.post('/send/:id', isAuthentication, sendMessage);
router.get('/:id',isAuthentication,getMessages);


export default router;