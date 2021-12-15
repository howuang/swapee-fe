const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/authentication');

router.post("/", userController.create);
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);
router.post("/:id/membership", authMiddleware.loginRequired, userController.upgradeMembership)      
router.get("/:displayName",  userController.readUser); 
router.put("/:id", authMiddleware.loginRequired, userController.updateProfile);
router.delete("/:id", authMiddleware.loginRequired,userController.destroy);
        
module.exports = router;
        
