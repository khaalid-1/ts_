import { Status } from "../../generated/prisma/enums";
import { prisma } from "../config/prisma";

export const taskRepo = {
  create: async (title: string, userId: number) => {
    return await prisma.task.create({
      data: {
        title,
        userId,
      },
    });
  },
  getAll: async (filters:any, skip:number,take:number,userId:number) => {
    return await prisma.task.findMany({
        where:{...filters,userId},
      skip,
      take,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  },
  countAll: async(filters:any)=>{
        return await prisma.task.count({where:filters});
  },
  get: async (id: number) => {
    return await prisma.task.findUnique({
      where: { id },
    });
  },
  update: async (id: number, status: Status) => {
    return await prisma.task.update({
      where: { id },
      data: { status },
    });
  },
  delete: async (id: number) => {
    return await prisma.task.delete({
      where: { id },
    });
  },
};
