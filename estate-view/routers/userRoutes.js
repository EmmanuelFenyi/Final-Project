const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

router.route("/").get(userController.getAllUsers);
router.route("/buyers").get(userController.getAllBuyers);
router.route("/developers").get(userController.getAllDevelopers);

router
  .route("/:userId")
  .get(userController.getSingleUser)
  .patch(verifyToken, userController.updateUser)
  .delete(verifyToken, userController.deleteUser);

module.exports = router;
