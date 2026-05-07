import exp from 'express'
import { pageSchema } from '../models/pageSchema'
import { workspaceSchema } from '../models/workspaceSchema'
export const pageApp=exp()

//create page in workspace
pageApp.post("/",async(req,res)=>{
    //get title , icon , content and workspace from req body
    const {title,icon,content,workspace}=req.body
    //get user id from decoded token
    const userId=req.user?.userId
    //create page
    const page=await pageSchema.create({title,icon,content,workspace,createdBy:userId,lastEditedBy:userId})
    //add page to workspace
    const workspaceData=await workspaceSchema.findById(workspace)
    workspaceData.pages.push(page._id)
    await workspaceData.save()
    //send response
    res.status(201).json({message:"Page created successfully",payload:page})
})


//create sub-page
pageApp.post("/sub-page",async(req,res)=>{
    //get title , icon , content , workspace and parent from req body
    const {title,icon,content,workspace,parent}=req.body
    //get user id from decoded token
    const userId=req.user?.userId
    //create page
    const page=await pageSchema.create({title,icon,content,workspace,createdBy:userId,lastEditedBy:userId,parent})
    //add page to workspace
    const workspaceData=await workspaceSchema.findById(workspace)
    workspaceData.pages.push(page._id)
    await workspaceData.save()
    //send response
    res.status(201).json({message:"Page created successfully",payload:page})
})



//get all pages in workspace (only top level)
pageApp.get("/",async(req,res)=>{
    //get workspace from req query
    const {workspace}=req.query
    //find all pages in workspace
    const pages=await pageSchema.find({workspace})
    //send response
    res.status(200).json({message:"Pages fetched successfully",payload:pages})
})

//get page by id
pageApp.get("/:id",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //find page by id
    const page=await pageSchema.findById(id)
    //send response
    res.status(200).json({message:"Page fetched successfully",payload:page})
})

//update page
pageApp.put("/:id",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //get updated data from req body
    const {title,icon,content}=req.body
    //update page
    const page=await pageSchema.findByIdAndUpdate(id,{title,icon,content})
    //send response
    res.status(200).json({message:"Page updated successfully",payload:page})
})

//update page cover image
pageApp.put("/:id/cover",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //get updated cover image from req body
    const {coverImage}=req.body
    const userId=req.user?.userId
    //update page cover image
    const page=await pageSchema.findByIdAndUpdate(id,{coverImage,lastEditedBy:userId})
    //send response
    res.status(200).json({message:"Page cover image updated successfully",payload:page})
})


//move page to different parent
pageApp.put("/:id/move",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //get new parent id from req body
    const {parent}=req.body
    //move page to different parent
    const page=await pageSchema.findByIdAndUpdate(id,{parent})
    //send response
    res.status(200).json({message:"Page moved successfully",payload:page})
})

//move page to top-level (remove parent)
pageApp.put("/:id/move-to-top",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //move page to top-level
    const page=await pageSchema.findByIdAndUpdate(id,{parent:null})
    //send response
    res.status(200).json({message:"Page moved to top-level successfully",payload:page})
})

//archive page
pageApp.put("/:id/archive",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //archive page
    const page=await pageSchema.findByIdAndUpdate(id,{isArchived:true})
    //send response
    res.status(200).json({message:"Page archived successfully",payload:page})
})

//unarchive page
pageApp.put("/:id/unarchive",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //unarchive page
    const page=await pageSchema.findByIdAndUpdate(id,{isArchived:false})
    //send response
    res.status(200).json({message:"Page unarchived successfully",payload:page})
})

//toggle favorite
pageApp.put("/:id/favorite",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //toggle favorite
    const page=await pageSchema.findByIdAndUpdate(id,{isFavorite:!req.page.isFavorite})
    //send response
    res.status(200).json({message:"Page favorited successfully",payload:page})
})

//delete page
pageApp.delete("/:id",async(req,res)=>{
    //get page id from req params
    const {id}=req.params
    //delete page
    const page=await pageSchema.findByIdAndDelete(id)
    //send response
    res.status(200).json({message:"Page deleted successfully",payload:page})
})