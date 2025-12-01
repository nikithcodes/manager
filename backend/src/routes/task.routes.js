import { Router } from "express";
import { createTask, updateTask, deleteTask, getTasks, markTaskCompleted } from "../controllers/task.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
const taskRouter = Router()

taskRouter.route('/add').post(verifyJWT,createTask)
taskRouter.route('/update').patch(verifyJWT,updateTask)
taskRouter.route('/delete').delete(verifyJWT,deleteTask)
taskRouter.route('/getalltasks').get(verifyJWT,getTasks)
taskRouter.route('/markcomplete/:taskId').patch(verifyJWT,markTaskCompleted)


export {taskRouter}