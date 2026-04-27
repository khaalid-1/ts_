import express from "express";
import cors from "cors";
import { port } from "./config/config";
import taskRouter from "./router/task.route";
import { globalError } from "./middleware/errorHandle";
import helmet from "helmet";
import hpp from "hpp";


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use(hpp())
app.use("/api/tasks",taskRouter)
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server is a live"
    })
})


app.use(globalError);
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})