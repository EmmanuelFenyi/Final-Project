const Project = require("../models/Project");
const EstateDeveloper = require("../models/EstateDeveloper");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).send("Project with this ID could not be found");
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      images,
      location,
      price,
      estateDeveloper: estateDeveloperId,
    } = req.body;

    const project = await Project.create({
      projectName,
      description,
      images,
      location,
      price,
      estateDeveloper: estateDeveloperId,
    });

    const estateDeveloper = await EstateDeveloper.findById(estateDeveloperId);
    estateDeveloper.projects.push(project._id);
    await estateDeveloper.save();

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndDelete(projectId);
    res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
