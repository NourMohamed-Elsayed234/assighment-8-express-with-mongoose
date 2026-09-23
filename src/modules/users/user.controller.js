import { Router } from "express";
import{signUp,login,updateUser,deleteUser,getUserById} from "./user.service.js"
const router = Router()


router.post("/signUp",async (req,res)=>{
    let data = await signUp(req.body)
    res.json(data)
})

router.post("/login",async (req,res)=>{
    let data = await login(req.body)
    res.json(data)
})

router.put("/update-user",async (req,res)=>{
    let data = await updateUser(req.query,req.body)
    res.json(data)
})
router.delete("/datete-user",async(req,res)=>{
    let data = await deleteUser(req.query)
    res.json(data)
})

router.get("/get-user-by-id",async(req,res)=>{
    let data = await getUserById(req.query)
    res.json(data)
})







export default router
