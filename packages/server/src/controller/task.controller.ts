import type { Request, Response } from "express";
import { taskService } from "../service/task.service";
import { catchAsync } from "../utils/catchAsync";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: false,
      message: "Title and user required",
    });
  }

  const { title, userId } = req.body;

  const task = await taskService.createTask(title, userId);

  return res.status(201).json({
    status: false,
    message: "new Task created !",
    data: task,
  });
});
export const getAllTask = catchAsync(async (req: Request, res: Response) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search;
  const tasks = await taskService.getAllTask(page,limit,status as string,search as string);

  return res.status(200).json({
    status: false,
    ...tasks
  });
});
export const getTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await taskService.getTask(Number(id));

  return res.status(200).json({
    status: false,
    data: task,
  });
});
export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, userId } = req.body;

  const task = await taskService.updateTask(Number(id), status, Number(userId));

  return res.status(200).json({
    status: false,
    message: "task is updated",
    data: task,
  });
});
export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  const task = await taskService.deletTask(Number(id), Number(userId));

  return res.status(204).json({
    status: false,
    data: task,
  });
});
