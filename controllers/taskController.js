import Task from "../models/task.js";

//create task

export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const task = await new Task({
      title,
      description,
      dueDate,
      status: status?.toLowerCase(),
      userId: req.user.userId,
    }).save();
    res.status(201).json(task);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: "Error while creating task" });
  }
};

//get all tasks

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: "Error while fetching tasks" });
  }
};

//get single task

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      _id: id,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: "Error deleting task" });
  }
};

//update task

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      { title, description, status, dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: "Error updating task" });
  }
};

//delete task

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: "Error deleting task" });
  }
};
