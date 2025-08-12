const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }); //shorthand property
  //res.status(200).json({status:"success", data : {tasks , amount : tasks.length}})//here task array will be stored in data.
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  }); //these options will return the updated values only (otherwise it was just returning the old value while updated the old one) and also validators of schema wll also be applied on the updated value.
  if (!task) {
    return next(createCustomError(`No task with id ${TaskID}`, 404));
    // const error = new Error("not found");
    // error.status = 404;
    // return next(error);
    // // return res.status(404).json({ msg: `No task with id : ${TaskID}` });
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task }); // just for the postman to see what it deleted
  // res.status(200).send() //becoz we dont generally see in frontend what has been deleted
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
