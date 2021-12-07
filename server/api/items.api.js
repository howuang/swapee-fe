const express = require('express');
const itemController = require('../controllers/item.controller');
const router = express.Router();

const authMiddleware = require("../middlewares/authentication");

router.post("/", authMiddleware.loginRequired, itemController.create);
router.get("/", itemController.list);
router.get("/:id", itemController.getSingleItem)
router.put("/:id", authMiddleware.loginRequired, itemController.update);
router.delete("/:id", authMiddleware.loginRequired, itemController.delete);
router.post("/:id", authMiddleware.loginRequired, itemController.createOfferRequest);

module.exports = router;

