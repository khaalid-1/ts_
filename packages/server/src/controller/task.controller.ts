import type { Request, Response } from "express";
import { taskService } from "../service/task.service";

export const createTask = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: false,
      message: "Title and user required",
    });
  }

  const { title, userId } = req.body;
  try {
    const task = await taskService.createTask(title, userId);

    return res.status(201).json({
      status: false,
      message: "new Task created !",
      data: task,
    });
  } catch (error: any) {
    if (error.message === "TITLE_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "Title required",
      });
    }
    if (error.message === "USERID_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "userId required",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const getAllTask = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTask();

    return res.status(200).json({
      status: false,
      data: tasks,
      meta: {
        total: tasks.length,
        serverTime: new Date(),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await taskService.getTask(Number(id));

    return res.status(200).json({
      status: false,
      data: task,
    });
  } catch (error: any) {
    if (error.message === "ID_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "id required",
      });
    }
    if (error.message === "TASK_NOT_FOUND") {
      return res.status(400).json({
        status: false,
        message: "task not found ",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status,userId } = req.body;
  try {
    const task = await taskService.updateTask(Number(id),status,Number(userId));

    return res.status(200).json({
      status: false,
      message:"task is updated",
      data: task,
    });
  } catch (error: any) {
    if (error.message === "ID_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "id required",
      });
    }
    if (error.message === "USERID_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "user id required",
      });
    }
    if (error.message === "INVALID_STATUS") {
      return res.status(400).json({
        status: false,
        message: "status invalid",
      });
    }
    if (error.message === "TASK_NOT_FOUND") {
      return res.status(400).json({
        status: false,
        message: "task not found ",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const task = await taskService.deletTask(Number(id),Number(userId));

    return res.status(204).json({
      status: false,
      data: task,
    });
  } catch (error: any) {
    if (error.message === "ID_REQUIRED") {
      return res.status(400).json({
        status: false,
        message: "id required",
      });
    }
    if (error.message === "TASK_NOT_FOUND") {
      return res.status(400).json({
        status: false,
        message: "task not found ",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
