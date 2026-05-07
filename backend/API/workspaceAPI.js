import exp from 'express'
import {workspaceSchema} from '../models/workspaceSchema.js'
import {userSchema} from '../models/userSchema.js'
import {boardSchema} from '../models/boardSchema.js'
import {pageSchema} from '../models/pageSchema.js'

const workspaceApp = exp.Router()

//create workspace
workspaceApp.post("/",async(req,res)=>{
    //get workspace name , description , icon from req body
    const {name,description,icon}=req.body
    //get user id from decoded token
    const userId=req.user?.userId
    //create workspace
    const workspace=await workspaceSchema.create({name,description,icon,createdBy:userId})
    //add workspace to user
    const user=await userSchema.findById(userId)
    user.workspace.push(workspace._id)
    await user.save()
    //send response
    res.status(201).json({message:"Workspace created successfully",payload:workspace})
})


//get all workspaces
workspaceApp.get("/",async(req,res)=>{
    //get user id from decoded token
    const userId=req.user?.userId
    //get all workspaces
    const workspaces=await workspaceSchema.find({createdBy:userId})
    //send response
    res.status(200).json({message:"All workspaces fetched successfully",payload:workspaces})
})



//get workspace by id
workspaceApp.get("/:id",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get workspace
    const workspace=await workspaceSchema.findById(id)
    //send response
    res.status(200).json({message:"Workspace fetched successfully",payload:workspace})
})



//update workspace
workspaceApp.put("/:id",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get updated data from req body
    const {name,description,icon}=req.body
    //update workspace
    const workspace=await workspaceSchema.findByIdAndUpdate(id,{name,description,icon})
    //send response
    res.status(200).json({message:"Workspace updated successfully",payload:workspace})
})



//delete workspace
workspaceApp.delete("/:id",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //delete workspace
    const workspace=await workspaceSchema.findByIdAndDelete(id)
    //delete workspace from user
    const user=await userSchema.findById(req.user?.userId)
    user.workspace.pull(id)
    await user.save()
    //delete workspace boards
    await boardSchema.deleteMany({workspace:id})
    //delete workspace pages
    await pageSchema.deleteMany({workspace:id})
    //send response
    res.status(200).json({message:"Workspace deleted successfully",payload:workspace})
})



//add member to workspace
workspaceApp.post("/:id/members",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get user id from req body
    const {userId}=req.body
    //add member to workspace
    const workspace=await workspaceSchema.findByIdAndUpdate(id,{$push:{members:userId}})
    //add workspace to user
    const user=await userSchema.findById(userId)
    user.workspace.push(id)
    await user.save()
    //send response
    res.status(200).json({message:"Member added successfully",payload:workspace})
})



//remove member from workspace
workspaceApp.delete("/:id/members/:userId",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get user id from req params
    const {userId}=req.params
    //remove member from workspace
    const workspace=await workspaceSchema.findByIdAndUpdate(id,{$pull:{members:userId}})
    //remove workspace from user
    const user=await userSchema.findById(userId)
    user.workspace.pull(id)
    await user.save()
    //send response
    res.status(200).json({message:"Member removed successfully",payload:workspace})
})



//get workspace members
workspaceApp.get("/:id/members",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get workspace
    const workspace=await workspaceSchema.findById(id).populate("members.user","_id name email")
    //send response
    res.status(200).json({message:"Workspace members fetched successfully",payload:workspace.members})
})



//update member role
workspaceApp.put("/:id/members/:userId",async(req,res)=>{
    //get workspace id from req params
    const {id}=req.params
    //get user id from req params
    const {userId}=req.params
    //get new role from req body
    const {role}=req.body
    //update member role
    const workspace=await workspaceSchema.findByIdAndUpdate(id,{$set:{"members.$[member].role":role}},{arrayFilters:[{"member.user":userId}]})
    //send response
    res.status(200).json({message:"Member role updated successfully",payload:workspace})
})