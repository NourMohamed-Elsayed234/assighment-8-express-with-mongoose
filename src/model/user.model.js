import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema ({
    name:{
        type:String,
        required:true,
        max:300,
        min:3

    },email:{
       type:String,
        required:true,
        unique:true 
    },password:{
        type:String,
        required:true,
    },phone:{
        type:String,
        required:true,

    },age:{
      type:Number,
        max:60,
        min:18
    }
})

export const UserModel = mongoose.model("user",userSchema)
