import exp from 'express'
import { listSchema } from '../models/listSchema';
export const listApp=exp.Router();

// to create list
listApp.post('/',async(req,res)=>{
    //get new list obj from req
    const newList=req.body;
    //create new list document
    const newListDoc=new listSchema(newList);
    //save result
    const result=await newListDoc.save();
    //send res
    res.status(201).json({message:"list created",result});
});

// Get all lists in board
listApp.get("/", async (req, res) => {
// get board id from query
    const { board } = req.query;
// find lists
    const lists = await List.find({ board });
// response
    res.status(200).json({message: "Lists fetched successfully",lists});
});


// Get list by ID
listApp.get("/:id", async (req, res) => {
// get list id
    const { id } = req.params;
// find list
    const list = await List.findById(id);
// if list not found
    if (!list) {
        return res.status(404).json({
            message: "List not found"
        });
    }
// response
    res.status(200).json({ message: "List fetched successfully",list });
});


// Update list title
listApp.put("/:id", async (req, res) => {
// get list id
    const { id } = req.params;
// get updated title
    const { title } = req.body;
// update list
    const updateList = await List.findByIdAndUpdate(id,{ title },{ new: true });
// if list not found
if (!updateList) {
    return res.status(404).json({ message: "List not found" });
 }
// response
    res.status(200).json({message: "List updated successfully",updateList});
});


// Reorder list
listApp.put("/:id/reorder", async (req, res) => {
// get list id
    const { id } = req.params;
// get new position
    const { position } = req.body;
// update position
    const reorderList = await List.findByIdAndUpdate(id,{ position }, { new: true });
// if list not found
    if (!reorderList) {
        return res.status(404).json({ message: "List not found"});
    }
// response
    res.status(200).json({message: "List reordered successfully", reorderList});
});


// Delete list
listApp.delete("/:id", async (req, res) => {
// get list id
    const { id } = req.params;
// delete list
    const deleteList = await List.findByIdAndDelete(id);
// if list not found
    if (!deleteList) {
        return res.status(404).json({ message: "List not found" });
    }
// response
    res.status(200).json({message: "List deleted successfully"});
});