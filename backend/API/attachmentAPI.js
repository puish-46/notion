import exp from 'express'
import {attachmentSchema} from '../models/attachmentSchema'
export const attachmentApp=exp()


//upload attachment to card
attachmentApp.post("/",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get attachment data
    const {filename,url,fileType,card}=req.body
    //create attachment
    const attachment=await attachmentSchema.create({filename,url,fileType,card,uploadedBy:userId})
    //send response
    res.status(201).json({message:"Attachment uploaded successfully",payload:attachment})
})

//get all attachments for a card
attachmentApp.get("/",async(req,res)=>{
    //get card id
    const cardId=req.query.card
    //get attachments
    const attachments=await attachmentSchema.find({card:cardId})
    //send response
    res.status(200).json({message:"Attachments",payload:attachments})
})

//get attachment by ID
attachmentApp.get("/:attachmentId",async(req,res)=>{
    //get attachment id
    const attachmentId=req.params.attachmentId
    //get attachment
    const attachment=await attachmentSchema.findById(attachmentId)
    //send response
    res.status(200).json({message:"Attachment",payload:attachment})
})

//delete attachment
attachmentApp.delete("/:attachmentId",async(req,res)=>{
    //get attachment id
    const attachmentId=req.params.attachmentId
    //delete attachment
    const attachment=await attachmentSchema.findByIdAndDelete(attachmentId)
    //send response
    res.status(200).json({message:"Attachment deleted successfully"})
})
