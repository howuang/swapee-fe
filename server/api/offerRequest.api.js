const express = require('express');
const offerController = require('../controllers/offers.controller');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication');
   
router.get("/", authMiddleware.loginRequired, offerController.getAllOffers);
router.get("/:id", authMiddleware.loginRequired, offerController.getSingleOffer)
router.put("/:id", authMiddleware.loginRequired, offerController.update);
router.delete("/:id", authMiddleware.loginRequired, offerController.delete);
        
module.exports = router;
        