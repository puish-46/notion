import express from 'express'
import { cardModel, pageModel, boardModel } from '../models/mainModels.js'
import { verifyToken } from '../middleware/verifyToken.js'

export const searchAPP = express.Router()

// search across cards,pages,boards
searchAPP.get('/', verifyToken(), async(req,res,next)=>{
    try {
        const {q,workspace,type}=req.query
        if(!q) return res.status(400).json({message:"Please enter a search query"})
        if(!workspace) return res.status(400).json({message:"Workspace is required"})

        let result={}
        const searchRegex = new RegExp(q, 'i')

        if(type=="card"){
            const cards=await cardModel.find({workspace,title:searchRegex, archived: false})
            result.cards=cards
        }
        else if(type=="page"){
            const pages=await pageModel.find({workspace,title:searchRegex, isArchived: false})
            result.pages=pages
        }
        else if(type=="board"){
            const boards=await boardModel.find({workspace,title:searchRegex, archived: false})
            result.boards=boards
        }
        else {
            const cards = await cardModel.find({workspace,title: searchRegex, archived: false})
            const pages = await pageModel.find({workspace,title: searchRegex, isArchived: false})
            const boards = await boardModel.find({workspace,title: searchRegex, archived: false})
            result= {cards,pages,boards}
        }

        res.status(200).json({success: true, payload: result})
    } catch(err) { next(err) }
})
