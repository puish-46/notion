import exp from 'express'
import { boardSchema } from '../models/boardSchema'
export const boardApp=exp()



//create board
boardApp.post("/",async(req,res)=>{
    //get title , description and workspace from req body
    const {title,description,workspace,backgroundColor}=req.body
    //get owner id from decoded token
    const owner=req.user?.userId
    //create board
    const board=await boardSchema.create({title,description,workspace,backgroundColor,owner})
    //add board to workspace
    const workspaceData=await workspaceSchema.findById(workspace)
    workspaceData.boards.push(board._id)
    await workspaceData.save()
    //send response
    res.status(201).json({message:"Board created successfully",payload:board})
})



//get all boards in workspace
boardApp.get("/",async(req,res)=>{
    //get workspace from req query
    const {workspace}=req.query
    //find all boards in workspace
    const boards=await boardSchema.find({workspace})
    //send response
    res.status(200).json({message:"Boards fetched successfully",payload:boards})
})


//get board by id
boardApp.get("/:id",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //find board by id
    const board=await boardSchema.findById(id)
    //send response
    res.status(200).json({message:"Board fetched successfully",payload:board})
})


//update board
boardApp.put("/:id",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //get updated data from req body
    const {title,description,workspace,backgroundColor}=req.body
    //update board
    const board=await boardSchema.findByIdAndUpdate(id,{title,description,workspace,backgroundColor})
    //send response
    res.status(200).json({message:"Board updated successfully",payload:board})
})


//archive board
boardApp.put("/:id/archive",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //archive board
    const board=await boardSchema.findByIdAndUpdate(id,{archived:true})
    //send response
    res.status(200).json({message:"Board archived successfully",payload:board})
})


//unarchive board
boardApp.put("/:id/unarchive",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //unarchive board
    const board=await boardSchema.findByIdAndUpdate(id,{archived:false})
    //send response
    res.status(200).json({message:"Board unarchived successfully",payload:board})
})


//delete board
boardApp.delete("/:id",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //delete board
    const board=await boardSchema.findByIdAndDelete(id)
    //send response
    res.status(200).json({message:"Board deleted successfully",payload:board})
})


//add member to board
boardApp.post("/:id/members",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //get member id from req body
    const {userId}=req.body
    //add member to board
    const board=await boardSchema.findByIdAndUpdate(id,{$push:{members:userId}})
    //send response
    res.status(200).json({message:"Member added successfully",payload:board})
})


//update member role in board
boardApp.put("/:id/members/:userId",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //get member id from req params
    const {userId}=req.params
    //get updated role from req body
    const {role}=req.body
    //update member role in board
    const board=await boardSchema.findByIdAndUpdate(id,{$set:{members:{[userId]:role}}})
    //send response
    res.status(200).json({message:"Member role updated successfully",payload:board})
})

//remove member from board
boardApp.delete("/:id/members/:userId",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //get member id from req params
    const {userId}=req.params
    //remove member from board
    const board=await boardSchema.findByIdAndUpdate(id,{$pull:{members:userId}})
    //send response
    res.status(200).json({message:"Member removed successfully",payload:board})
})



//save board as template
boardApp.post("/:id/save-template",async(req,res)=>{
    //get board id from req params
    const {id}=req.params
    //save board as template
    const board=await boardSchema.findByIdAndUpdate(id,{isTemplate:true})
    //send response
    res.status(200).json({message:"Board saved as template successfully",payload:board})
})



//create board from template
boardApp.post("/from-template",async(req,res)=>{
    //get template id , workspace ,title and description from req body
    const {templateId,workspace,title}=req.body
    //create board from template
    const board=await boardSchema.findByIdAndUpdate(templateId,{workspace,title})
    //send response
    res.status(200).json({message:"Board created from template successfully",payload:board})
})



//get all templates
boardApp.get("/templates",async(req,res)=>{
    //get workspace from req query
    const {workspace}=req.query
    //find all templates in workspace
    const templates=await boardSchema.find({workspace,isTemplate:true})
    //send response
    res.status(200).json({message:"Templates fetched successfully",payload:templates})
})