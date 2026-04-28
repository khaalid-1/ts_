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
import { createTaskSchema, deleteTaskSchema, getAllTaskSchema, paramTaskSchema, updateTaskSchema } from "../validator/validator";
import { appRateLimit } from "../middleware/rateLimit";
import { protect } from "../middleware/protect";

const router = Router();
router.use(protect);
router.route("/")
.get(validate(getAllTaskSchema),appRateLimit,getAllTask)
.post(validate(createTaskSchema), createTask);
router
  .route("/:id")
  .get(validate(paramTaskSchema),appRateLimit, getTask)
  .patch(validate(updateTaskSchema),updateTask)
  .delete(validate(deleteTaskSchema), deleteTask);

export default router;
