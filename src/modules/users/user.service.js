import { UserModel } from "../../model/user.model.js"





export const signUp =async (body)=>{
    let {name, email, password, phone, age}= body
    let existEmail = await UserModel.findOne({email})
    if(existEmail){
        return ({message:"email already exist"})
    }else{
    let userData = await UserModel.insertOne({name, email, password, phone, age})
    if(userData){
        return ({message:"user added sussccfully"})
    }else{
        return ({message:"somthing went wrong"})
    }
    }
}

export const login =async (body)=>{
    let { email, password}= body
    let user = await UserModel.findOne({email})
    if(!user){
        return ({message:"Invalid email or password"})
    }
    if (user.password !== password) {
        return { message: "Invalid email or password" };
    }
    return ({message:"Login successfully", user})
}
export const updateUser = async(query,body)=>{
    let {id} = query
    let{name, email, phone, age}=body
    let user = await UserModel.findById(id)
    if(!user){
        return ({message:"user not found"})
    }
    if(email && email !== user.email){
        let existEmail = await UserModel.findOne({email})
        if(existEmail){
            return ({message:"email already exist"})
        }
    }
    let updateuser = await UserModel.findByIdAndUpdate(id,{name, email, phone, age},{ new: true })
    if(updateuser){
        return ({message:"user updated sussfully"})
    }else{
        return "somthing went wrong"
    }
}
export const deleteUser = async(query)=>{
let {id} =query
let userData = await UserModel.findByIdAndDelete(id)
if(userData){
    return ({message:"user deleted sussccfully"})
}else{
    return ({message :"user not found"})
}
}
export const getUserById = async (query)=>{
    let {id}=query
    let userData = await UserModel.findById(id)
    if(userData){
        return ({message:"userdata",userData})
    }else{
        return ({message:"user not found"})
    }
}
