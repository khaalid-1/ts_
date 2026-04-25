import type { NextFunction, Request, Response } from "express";


export const globalError = (err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = err.status || 500;
    let message = err.message || 'Something Went wrong';


    if(err.name =="ZodError"){
       
        return res.status(404).json({
            status:false,
            message:"Validation error",
            error:err.issues.map((e:any)=> ({
                field:e.path[e.path.length -1],
                message:e.message

            }))
        })
    }

    if(err.isOperational){
        return res.status(statusCode).json({
            status:false,
            message:message
        })
    }else{
        console.log('error '+ err);

        return res.status(500).json({
            status:false,
            message:'Interal server error',
            stack : process.env.NODE_ENV =='development' ? err.stack : undefined
        })
    }
}