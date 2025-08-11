const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); //shorthand property
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` }); //correct syntax for the id but not registered
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error }); //syntax or any other error
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
      new: true,
      runValidators: true,
    }); //these options will return the updated values only (otherwise it was just returning the old value while updated the old one) and also validators of schema wll also be applied on the updated value.
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${TaskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: TaskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${TaskID}` });
    }
    res.status(200).json({ task }); // just for the postman to see what it deleted
    // res.status(200).send() //becoz we dont generally see in frontend what has been deleted
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
