import rateLimit from "express-rate-limit";
export const  appRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max:5,
    message:{
        status:false,
        message:"to mutch request try again in 1 minitute later"
    },
    standardHeaders:true,
    legacyHeaders:false
})