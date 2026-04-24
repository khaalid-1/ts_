import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controller/task.controller";
import { DEFAULT_CIPHERS } from "node:tls";
import { validate } from "../middleware/validate";
import { createTaskSchema, deleteTaskSchema, paramTaskSchema, updateTaskSchema } from "../validator/validator";

const router = Router();

router.route("/").get(getAllTask).post(validate(createTaskSchema), createTask);
router
  .route("/:id")
  .get(validate(paramTaskSchema), getTask)
  .patch(validate(updateTaskSchema),updateTask)
  .delete(validate(deleteTaskSchema), deleteTask);

export default router;
