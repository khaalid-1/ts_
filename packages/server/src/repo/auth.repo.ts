import { prisma } from "../config/prisma"



export const authRepo = {
    create:async(data:{name:string,email:string,password:string})=>{
       return await prisma.user.create({data})
    },
    findByEmail : async (email:string)=>{
        return await prisma.user.findUnique({
          where:{email}
        })
    }, 
    findById : async (id:number)=>{
        return await prisma.user.findUnique({
          where:{id}
        })
    }, 
    findAll : async ()=>{
        return await prisma.user.findMany();
    }, 
}