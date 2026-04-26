import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import "../models/courseModel.js";



//Get /api/projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("courseId");
        res.json(projects);
    }   catch (error) {
        res.status(500).json({message: "Failed to fetch projects" });
    }
};

// GET /api/projects/:id/tasks
export const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


// POST /api/projects
export const createProject = async (req,res) => {
    try {
        const { title, deadline, estimatedHours, status, courseId } = req.body;
    
        if (!title || !courseId) {
        return res.status(400).json({ message: "Title and courseId are required" });
        }

        const project = await Project.create({
            title,
            deadline,
            estimatedHours,
            status,
            courseId,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to create project" });
      }
};

// PUT /api/projects/:id
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(400).json({ message: "Failed to update project" });
    }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Task.deleteMany({ projectId: req.params.id });

        res.json({ message: "Project and related tasks deleted" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete project" });
    }
};

// GET /api/projects/stats/summary
export const getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({ status: "done" });
    const inProgressProjects = await Project.countDocuments({ status: "in progress" });
    const notStartedProjects = await Project.countDocuments({ status: "not started" });

    res.json({
      totalProjects,
      completedProjects,
      inProgressProjects,
      notStartedProjects,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project statistics" });
  }
};