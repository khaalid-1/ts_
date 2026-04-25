import { error } from "node:console";
import { title } from "node:process";
import { taskRepo } from "../repo/repo";
import { Status } from "../../generated/prisma/enums";
import { AppError } from "../utils/appError";

export const taskService = {
  createTask: async (title: string, userId: number) => {
    if (!title) throw new AppError("Title is required", 404);
    if (!userId) throw new AppError("userId is required", 404);
    return taskRepo.create(title, userId);
  },
  getAllTask: async () => {
    return taskRepo.getAll();
  },
  getTask: async (id: number) => {
    if (!id) throw new AppError("id is required", 404);
    const task = await taskRepo.get(id);
    if (!task) throw new AppError("Task not found", 404);

    return task;
  },
  updateTask: async (id: number, status: Status, userId: number) => {
    if (!title) throw new AppError("Title is required", 404);
    if (!userId) throw new AppError("userId is required", 404);
    const task = await taskRepo.get(id);
    if (!task) throw new AppError("Task not found", 404);

    if (task.userId !== userId)
      throw new AppError("you are not AUTHORIZED", 404);

    return taskRepo.update(id, status);
  },
  deletTask: async (id: number, userId: number) => {
    if (!id) throw new AppError("id is required", 404);
    if (!userId) throw new AppError("userId is required", 404);

    const task = await taskRepo.get(id);
    if (!task) throw new AppError("Task not found", 404);
    if (task.userId !== userId)
      throw new AppError("you are not AUTHORIZED", 404);

    return taskRepo.delete(id);
  },
};
