import express from "express"
import { inviteModel } from "../models/mainModels.js"
import { verifyToken } from '../middleware/verifyToken.js'
import crypto from "crypto"

export const inviteAPP = express.Router()

//send invite
inviteAPP.post("/", verifyToken(), async(req,res,next)=>{
    try {
        const userId = req.user.id
        const {email,role,workspace} = req.body
        
        // Generate an invite token
        const inviteToken = crypto.randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        
        const invite = await inviteModel.create({
            email,
            role,
            workspace,
            invitedBy: userId,
            inviteToken,
            expiresAt
        })
        res.status(201).json({message:"Invite sent successfully",payload:invite})
    } catch(err) { next(err) }
})

//get all pending invites for workspace
inviteAPP.get("/", verifyToken(), async(req,res,next)=>{
    try {
        const workspaceId = req.query.workspace
        if(!workspaceId) return res.status(400).json({message:"workspace query param required"})
        
        const invites = await inviteModel.find({workspace:workspaceId, status: "PENDING"})
        res.status(200).json({message:"Invites fetched",payload:invites})
    } catch(err) { next(err) }
})

//accept invite via token
inviteAPP.post("/accept/:inviteToken", verifyToken(), async(req,res,next)=>{
    try {
        const inviteToken = req.params.inviteToken
        const invite = await inviteModel.findOne({inviteToken})
        
        if(!invite) return res.status(404).json({message:"Invite not found"})
        if(invite.expiresAt < Date.now()) return res.status(400).json({message:"Invite has expired"})
        if(invite.status !== "PENDING") return res.status(400).json({message:"Invite is no longer pending"})
        
        invite.status = "ACCEPTED"
        await invite.save()
        
        res.status(200).json({message:"Invite accepted successfully",payload:invite})
    } catch(err) { next(err) }
})

//decline invite via token
inviteAPP.post("/decline/:inviteToken", verifyToken(), async(req,res,next)=>{
    try {
        const inviteToken = req.params.inviteToken
        const invite = await inviteModel.findOne({inviteToken})
        
        if(!invite) return res.status(404).json({message:"Invite not found"})
        if(invite.expiresAt < Date.now()) return res.status(400).json({message:"Invite has expired"})
        if(invite.status !== "PENDING") return res.status(400).json({message:"Invite is no longer pending"})
        
        invite.status = "DECLINED"
        await invite.save()
        
        res.status(200).json({message:"Invite declined successfully",payload:invite})
    } catch(err) { next(err) }
})

//resend invite
inviteAPP.post("/:id/resend", verifyToken(), async(req,res,next)=>{
    try {
        const inviteId = req.params.id
        const invite = await inviteModel.findById(inviteId)
        
        if(!invite) return res.status(404).json({message:"Invite not found"})
        
        invite.inviteToken = crypto.randomBytes(32).toString("hex")
        invite.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        invite.status = "PENDING"
        await invite.save()
        
        res.status(200).json({message:"Invite resent successfully",payload:invite})
    } catch(err) { next(err) }
})

//cancel/delete invite
inviteAPP.delete("/:id", verifyToken(), async(req,res,next)=>{
    try {
        const inviteId = req.params.id
        const invite = await inviteModel.findByIdAndDelete(inviteId)
        if(!invite) return res.status(404).json({message:"Invite not found"})
        
        res.status(200).json({message:"Invite deleted successfully"})
    } catch(err) { next(err) }
})