import exp from 'express'
import { userSchema } from '../models/userSchema'
import { boardSchema } from '../models/boardSchema'
import { pageSchema } from '../models/pageSchema'
import { workspaceSchema } from '../models/workspaceSchema'
import { hash,compare } from "bcryptjs"
export const userApp=exp()



//get user profile
userApp.get("/me",async(req,res)=>{
    //get user id 
    const userId=req.user?.userId
    //read user
    const user=await userSchema.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    //send response
    res.status(200).json({message:"user profile",payload:user})
})


//update my profile
userApp.put("/me",async(req,res)=>{
    //get user id from decoded token
    const userId=req.user?.userId
    //get modified profile from req body
    const {firstName,lastName,avatarUrl}=req.body
    const modifieduser=await userSchema.findOneAndUpdate({_id:userId},{$set:{firstName,lastName,avatarUrl}},{returnDocument:"after"})
    if(!modifieduser){
        return res.status(404).json({message:"User not found"});
    }
    //send response
    res.status(200).json({message:"Profile updated successfully",payload:modifieduser})
})


//change password
userApp.put("/change-password",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get modified password
    const {currentPassword,newPassword}=req.body
    //read user
    const user=await userSchema.findById(userId)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    //compare password
    const isMatch=await compare(currentPassword,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Current password incorrect"})
    }
    //hash new password
    const hashedPassword=await hash(newPassword,12)
    //update password
    user.password=hashedPassword
    await user.save()
    //send response
    res.status(200).json({message:"Password changed successfully"})
})


//star a board
userApp.post("/star/board/:boardId",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get board id
    const boardId=req.params.boardId
    //read user
    const user=await userSchema.findById(userId)
    //read board
    const board=await boardSchema.findById(boardId)
    if(!board){
        return res.status(404).json({message:"Board not found"})
    }
    //check if board is already starred
    if(user.starredBoards.includes(boardId)){
        return res.status(400).json({message:"Board is already starred"})
    }
    //add board to starred boards
    user.starredBoards.push(boardId)
    await user.save()
    //send response
    res.status(200).json({message:"Board starred successfully",payload:user})
})

//unstar a board
userApp.post("/unstar/board/:boardId",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get board id
    const boardId=req.params.boardId
    //read user
    const user=await userSchema.findById(userId)
    //remove board from starred boards
    user.starredBoards.pull(boardId)
    await user.save()
    //send response
    res.status(200).json({message:"Board unstarred successfully",payload:user})
})

//star page 
userApp.post("/star/page/:pageId",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get page id
    const pageId=req.params.pageId
    //read user
    const user=await userSchema.findById(userId)
    //read page
    const page=await pageSchema.findById(pageId)
    if(!page){
        return res.status(404).json({message:"Page not found"})
    }
    //check if page is already starred
    if(user.starredPages.includes(pageId)){
        return res.status(400).json({message:"Page is already starred"})
    }
    //add page to starred pages
    user.starredPages.push(pageId)
    await user.save()
    //send response
    res.status(200).json({message:"Page starred successfully",payload:user})
})

//unstar a page
userApp.post("/unstar/page/:pageId",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get page id
    const pageId=req.params.pageId
    //read user
    const user=await userSchema.findById(userId)
    //remove page from starred pages
    user.starredPages.pull(pageId)
    await user.save()
    //send response
    res.status(200).json({message:"Page unstarred successfully",payload:user})
})

//get all starred items
userApp.get("/starred",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //read user
    const user=await userSchema.findById(userId).populate("starredBoards")
    //send response
    res.status(200).json({message:"Starred items",payload:user})
})

//delete my account
userApp.delete("/me",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //delete user
    const user=await userSchema.findByIdAndDelete(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    //delete user from all workspaces
    const workspaces=await workspaceSchema.find({members:userId})
    workspaces.forEach(async(workspace)=>{
        workspace.members.pull(userId)
        await workspace.save()
    })
    //send response
    res.status(200).json({message:"User deleted successfully"})
})
