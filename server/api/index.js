const express = require('express');
const router = express.Router();

const usersRouter = require("./users.api");
router.use('/users', usersRouter)

const authRouter = require("./auth.api");
router.use('/auth', authRouter)

const itemsRouter = require("./items.api");
router.use('/items', itemsRouter)

const offerRequestRouter = require("./offerRequest.api");
router.use('/offers', offerRequestRouter)

module.exports = router;
