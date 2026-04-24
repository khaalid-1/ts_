import { error } from "node:console";
import { title } from "node:process";
import { taskRepo } from "../repo/repo";
import { Status } from "../../generated/prisma/enums";

export const taskService = {
  createTask: async (title: string, userId: number) => {

    return taskRepo.create(title, userId);
  },
  getAllTask: async () => {
    return taskRepo.getAll();
  },
  getTask: async (id: number) => {

    const task = await taskRepo.get(id);
    if (!task) throw new Error("TASK_NOT_FOUND");

    return task;
  },
  updateTask: async (id: number,status:Status,userId:number) => {
  
    const task = await taskRepo.get(id);
    if (!task) throw new Error("TASK_NOT_FOUND");

    if(task.userId !== userId) throw new Error("NOT_AUTHORIZED")
    return taskRepo.update(id,status);
  },
  deletTask: async (id: number,userId:number) => {
  

    const task = await taskRepo.get(id);
    if (!task) throw new Error("TASK_NOT_FOUND");

    if(task.userId !== userId) throw new Error("NOT_AUTHORIZED")
    return taskRepo.delete(id);
  },

};
