import { Router } from "express";
import{createNote,updateNote,replace,updataAll,deletenote,getPaginatedNotes, 
        getnoteById,getnoteBycontent,getNotesWithUser,getNotesByAggregation,deleteNotes} from "./note.service.js"
const router = Router()


router.post("/",async(req,res)=>{
     let data = await createNote(req.query,req.body)
        res.json(data)
})

router.patch("/:noteId",async(req,res)=>{
     let data = await updateNote(req.params,req.query,req.body)
        res.json(data)
})

router.put("/replace/:noteId",async(req,res)=>{
     let data = await replace(req.params,req.query,req.body)
        res.json(data)
})


router.put("/all",async(req,res)=>{
     let data = await updataAll(req.query,req.body)
        res.json(data)
})

router.delete("/delete-note/:noteId",async(req,res)=>{
     let data = await deletenote(req.params,req.query)
        res.json(data)
})

router.get("/paginate-sort",async(req,res)=>{
    let data = await getPaginatedNotes(req.query)
        res.json(data)
})
router.get("/get-note-by-id/:noteId",async(req,res)=>{
    let data = await getnoteById(req.params,req.query)
        res.json(data)
})


router.get("/get-note-By-content",async(req,res)=>{
    let data = await getnoteBycontent(req.query)
        res.json(data)
})

router.get("/get-Notes-With-User",async(req,res)=>{
    let data = await getNotesWithUser(req.query)
        res.json(data)
})

router.get("/get-Notes-By-Aggregation",async(req,res)=>{
    let data = await getNotesByAggregation(req.query)
        res.json(data)
})

router.delete("/delete-notes",async(req,res)=>{
  let data = await deleteNotes(req.query)
        res.json(data)
})





export default router
