import exp from 'express'
import { cardSchema } from '../models/cardSchema';

export const searchApp=exp.Router();

// search across cards,pages,boards
searchApp.get('/',async(req,res)=>{
    //get the req body
    const {q,workspace,type}=req.query;
    //if search word isn't entered
    if(!q){
       return res.status(400).json({message:"Please enter to search"});
    }
    //to store the result
    let result={};
  // to search cards
  if(type=="card"){
    const cards=await Card.find({workspace,title:q});
    result.cards=cards;
  }
  // to search pages
  else if(type=="page"){
    const pages=await Page.find({workspace,title:q});
    result.pages=pages;
  }
   // to search board
  else if(type=="board"){
    const boards=await Board.find({workspace,title:q});
    result.boards=boards;
  }
  // if type not specified
else {

    const cards = await Card.find({workspace,title: q,});

    const pages = await Page.find({workspace,title: q,});

    const boards = await Board.find({workspace,title: q,});

    result= {cards,pages,boards,};
  }

  res.status(200).json({success: true,result,});
});

