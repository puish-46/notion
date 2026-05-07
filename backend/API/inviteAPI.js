import exp from "express"
import { inviteSchema } from "../models/inviteSchema"
export const inviteApp=exp()



//send invite
inviteApp.post("/",async(req,res)=>{
    //get user id
    const userId=req.user?.userId
    //get invite data
    const {email,role,workspace}=req.body
    //create invite
    const invite=await inviteSchema.create({email,role,workspace,invitedBy:userId})
    //send response
    res.status(201).json({message:"Invite sent successfully",payload:invite})
})

//get all pending invites for workspace
inviteApp.get("/",async(req,res)=>{
    //get workspace id
    const workspaceId=req.query.workspace
    //get invites
    const invites=await inviteSchema.find({workspace:workspaceId})
    //send response
    res.status(200).json({message:"Invites",payload:invites})
})

//accept invite via token
inviteApp.post("/accept/:inviteToken",async(req,res)=>{
    //get invite token
    const inviteToken=req.params.inviteToken
    //get invite
    const invite=await inviteSchema.findOne({inviteToken})
    //check if invite is valid
    if(!invite){
        return res.status(404).json({message:"Invite not found"})
    }
    //check if invite is expired
    if(invite.expiresAt < Date.now()){
        return res.status(400).json({message:"Invite has expired"})
    }
    //accept invite
    invite.status="ACCEPTED"
    await invite.save()
    //send response
    res.status(200).json({message:"Invite accepted successfully",payload:invite})
})

//decline invite via token
inviteApp.post("/decline/:inviteToken",async(req,res)=>{
    //get invite token
    const inviteToken=req.params.inviteToken
    //get invite
    const invite=await inviteSchema.findOne({inviteToken})
    //check if invite is valid
    if(!invite){
        return res.status(404).json({message:"Invite not found"})
    }
    //check if invite is expired
    if(invite.expiresAt < Date.now()){
        return res.status(400).json({message:"Invite has expired"})
    }
    //decline invite
    invite.status="DECLINED"
    await invite.save()
    //send response
    res.status(200).json({message:"Invite declined successfully",payload:invite})
})

//resend invite
inviteApp.post("/:inviteId/resend",async(req,res)=>{
    //get invite id
    const inviteId=req.params.inviteId
    //get invite
    const invite=await inviteSchema.findById(inviteId)
    //check if invite is valid
    if(!invite){
        return res.status(404).json({message:"Invite not found"})
    }
    //check if invite is already accepted or declined
    if(invite.status!=="PENDING"){
        return res.status(400).json({message:"Invite is already accepted or declined"})
    }
    //resend invite
    invite.inviteToken=crypto.randomBytes(32).toString("hex")
    invite.expiresAt=new Date(Date.now()+7*24*60*60*1000)
    await invite.save()
    //send response
    res.status(200).json({message:"Invite resent successfully",payload:invite})
})

//cancel/delete invite
inviteApp.delete("/:inviteId",async(req,res)=>{
    //get invite id
    const inviteId=req.params.inviteId
    //delete invite
    const invite=await inviteSchema.findByIdAndDelete(inviteId)
    //send response
    res.status(200).json({message:"Invite deleted successfully"})
})