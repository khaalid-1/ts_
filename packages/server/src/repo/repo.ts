import { Status } from "../../generated/prisma/enums"
import { prisma } from "../config/prisma"

export const taskRepo = {
    create: async (title:string,userId:number)=>{
        return await prisma.task.create({
            data:{
                title,
                userId
            }
        })
    },
    getAll : async ()=>{
        return await prisma.task.findMany({})
    },
    get: async (id:number)=>{
        return await prisma.task.findUnique({
            where:{id}
        })
    },
    update: async (id:number,status:Status)=>{
        return await prisma.task.update({
            where:{id},
            data:{status}
        })
    },
    delete  :async (id:number)=>{
        return await prisma.task.delete({
            where:{id}
        })
    }
}