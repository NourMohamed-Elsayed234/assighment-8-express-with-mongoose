import { NoteModel } from "../../model/note.model.js"
import mongoose from "mongoose"



export const createNote = async(query,body)=>{
let{id} = query
let{title,content}=body
let createnote = await NoteModel.create({title,content,userId:id})
if(createnote){
    return ({message:"note created"})
}else{
    return "somthing went wrong"
}
}

export const updateNote = async(params,query,body)=>{
    let {noteId}=params
    let{id}=query
    let{title,content}=body

    let existnote = await NoteModel.findById(noteId)
    if(!existnote){
        return ({message:"note not found"})
    }
    if(existnote.userId.toString() !== id){
        return ({message:"you are not the owner"})
    }
 let updatenote = await NoteModel.findByIdAndUpdate(noteId,{title,content},{new:true})
 if(updatenote){
    return ({message:"note updated succssfully"})
 }else{
     return ({message:"somthing went wrong"})
 }
}

export const replace = async(params,query,body)=>{
    let {noteId}=params
    let{id}=query
    let{title,content}=body

    let existnote = await NoteModel.findById(noteId)
    if(!existnote){
        return ({message:"note not found"})
    }
    if(existnote.userId.toString() !== id){
        return ({message:"you are not the owner"})
    }
 let updatenote = await NoteModel.findByIdAndUpdate(noteId,{title,content},{new:true})
 if(updatenote){
    return ({message:"note updated succssfully"})
 }else{
     return ({message:"somthing went wrong"})
 }
}

export const updataAll = async(query,body)=>{
let {id}=query
let {title}=body
let updateall = await NoteModel.updateMany({userId:id},{title})
if (updateall.modifiedCount === 0) {
        return { message: "No notes found " };
    }
    return ({message:"all notes updated"})
}

export const deletenote = async(params,query,body)=>{
    let {noteId}=params
    let{id}=query

    let existnote = await NoteModel.findById(noteId)
    if(!existnote){
        return ({message:"note not found"})
    }
    if(existnote.userId.toString() !== id){
        return ({message:"you are not the owner"})
    }
 let updatenote = await NoteModel.findByIdAndDelete(noteId)
 if(updatenote){
    return ({message:"note delete succssfully"})
 }else{
     return ({message:"somthing went wrong"})
 }
}

export const getPaginatedNotes = async (query) => {
    let { id, page = 1, limit = 3 } = query
    let pageNum = parseInt(page) || 1
    let limitNum = parseInt(limit) || 3

    let skip = (pageNum - 1) * limitNum

    let notes = await NoteModel.find({ userId: id })
        .sort({ createdAt: -1 }) 
        .skip(skip)             
        .limit(limitNum)        

    return {
        message: "Done",
        page: pageNum,
        limit: limitNum,
        notesCount: notes.length,
        notes
    }
}
export const getnoteById = async(params,query)=>{
    let {noteId}=params
    let{id}=query
    let existnote = await NoteModel.findById(noteId)
    if(!existnote){
        return ({message:"note not found"})
    }
    if(existnote.userId.toString() !== id){
        return ({message:"you are not the owner"})
    }
 let getnote = await NoteModel.findById(noteId)
 if(getnote){
    return ({message:"note",getnote})
 }else{
     return ({message:"somthing went wrong"})
 }
}

export const getnoteBycontent = async(query)=>{
    let{id,content}=query
    let existnote = await NoteModel.findOne({userId:id,content})
    if(!existnote){
        return ({message:"note not found"})
    }else{
     return existnote
 }
}

export const getNotesWithUser = async (query) => {
    let { id } = query
    let notes = await NoteModel.find({ userId: id }).select("title userId createdAt") 
        .populate({
            path: "userId",       
            select: "email -_id"  
        })

    return notes
}
export const getNotesByAggregation = async (query) => {
    let { id, title } = query;
    let pipeline = [];
    pipeline.push({
        $match: {
            userId: new mongoose.Types.ObjectId(id) 
        }
    })
    if (title) {
        pipeline.push({
            $match: {
                title: { $regex: title, $options: "i" } 
            }
        })
    }
    pipeline.push({
        $lookup: {
            from: "users",          
            localField: "userId",   
            foreignField: "_id",
            as: "userData"  
        }
    })
    pipeline.push({
        $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true 
        }
    })
    pipeline.push({
        $project: {
            title: 1,
            content: 1,
            createdAt: 1,
            "userData.name": 1,   
            "userData.email": 1,  
        }
    })
    let notes = await NoteModel.aggregate(pipeline);
    return notes
}

export const deleteNotes = async(query)=>{
    let{id}=query
 let deletenote = await NoteModel.deleteMany({ userId: id })
 if(deletenote.deletedCount > 0){
    return ({message:" all note delete succssfully"})
 }else{
     return ({message:"somthing went wrong"})
 }
}
