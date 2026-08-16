const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createChat, getMyChats, sendMessage, getMessages } = require('../controllers/chatController');

router.post('/', authMiddleware, createChat);
router.get('/my', authMiddleware, getMyChats);
router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:chatId', authMiddleware, getMessages);

module.exports = router;
