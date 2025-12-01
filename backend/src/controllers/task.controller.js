import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createTask = async (req, res) => {
  try {

    const _id = req.user._id

    const { title, description, category, dueDate } = req.body

    if ([title, description, category, dueDate].some(field => !field || (typeof field === 'string' && field.trim() === ""))) {
      return res.status(400).json(new ApiResponse(400, "All fields are required!"));
    }


    const task = await Task.create({
      owner: _id,
      title,
      description,
      category,
      dueDate
    })

    if (!task) {
      throw new ApiError(402, "Coudln't Add Tasks")
    }

    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task Created Successfully"))

  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Internal Server Error")
  }
}

const updateTask = async (req, res) => {
  try {

    const updates = req.body;

    if (!updates) {
      return res.status(400).json(new ApiResponse(400, "Task ID is required"));
    }

    const task = await Task.findByIdAndUpdate(updates._id, updates, { new: true });
    
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.query.task

    if (!id) {
      return res.status(400).json(new ApiResponse(400, "Task ID is required"));
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const getTasks = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json(new ApiResponse(400, null, "Owner ID is required"));
    }

    const tasks = await Task.find({ owner: _id});

    return res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const markTaskCompleted = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json(new ApiResponse(400, null, "Task ID is required"));
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task marked as completed"));
  } catch (error) {

    throw new ApiError(500, "Internal Server Error");
  }
};




export { createTask, updateTask, deleteTask, getTasks, markTaskCompleted }