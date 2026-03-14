const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET TASKS (Pagination + Search + Filter)
exports.getTasks = async (req, res) => {
  try {

    const { page = 1, limit = 10, status, search } = req.query;

    const query = { user: req.user.id };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};