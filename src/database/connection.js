
import mongoose from "mongoose";
import{env} from "../../config/env.service.js"







export const dataBaseConnection = ()=>{
mongoose.connect(env.database).then(()=>{
    console.log("database connection")
}).catch((error)=>{
    console.log(error)
})
}



