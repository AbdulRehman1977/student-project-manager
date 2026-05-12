import Task from "../models/taskModel.js";

// POST /api/tasks
export const createTask = async (req, res) => {
  const { title, projectId, dueDate } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!projectId) return res.status(400).json({ message: "projectId is required" });

  try {
    const task = await Task.create({ title, projectId, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// PATCH /api/tasks/:id
export const updateTask = async (req, res) => {
  const { completed } = req.body;

  if (completed === undefined || typeof completed !== "boolean") {
    return res.status(400).json({ message: "completed must be a boolean" });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};
