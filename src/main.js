import express from "express"
import {env} from "../config/env.service.js"
import {dataBaseConnection} from "./database/connection.js"
import userRouter from "./modules/users/user.controller.js"
import noteRouter from "./modules/notes/note.controller.js"
const app = express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)
dataBaseConnection()




app.get("/",(req,res)=>{
    res.json("hello")
})










app.listen(env.port,()=>{
    console.log(`server is running on port ${env.port}`)
})
