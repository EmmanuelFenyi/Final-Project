const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { verifyToken } = require("../controllers/authController");

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:projectId")
  .get(projectController.getSingleProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
