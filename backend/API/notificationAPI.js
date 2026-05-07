import exp from 'express'
import { notificationSchema } from '../models/notificationSchema';

export const notifyApp=exp.Router();
// to get all notifications
notifyApp.get("/",async(req,res)=>{
    const notifications=await Notification.find({recipient:req.user.id});
    //response
    res.status(200).json({message:"Notifications fetched successfully!!",notifications});
});

// to get count of unread notifications
notifyApp.get('/unread-count',async(req,res)=>{
    const unread=await Notification.find({recipient:req.user.id,isRead:false});
    //response
    res.status(200).json({message:"Notification count fetched succesfully!",count:unread.length});
});

// to mark the notification read
notifyApp.put("/:id/read",async(req,res)=>{
    // to get the id
    const {id}=req.params;
    const read=await Notification.findByIdAndUpdate(id,{isRead:true});
    if(!read){
        return res.status(404).json({message:"Notification not found!!"});
    }
    //response
    res.status(200).json({message:"Notification marked as read"});
});

// to mark all notifications as read
notifyApp.put("/read-all",async(req,res)=>{
       // updating unread notifications
        const read_all=await Notification.updateMany({recipient:req.user.id,isRead:false},{isRead:true});
        //response
        res.status(200).json({message:"All notifications marked as read"})
});

// to delete notifications
notifyApp.delete("/:id",async(req,res)=>{
    //to get the id
    const {id}=req.params;
    // used findByIdAndDelete to delete
    const delete_notification=await Notification.findByIdAndDelete(id);
    //response
    if(!delete_notification){
        return res.status(404).json({message:"Notification not found"});
    }
    return res.status(200).json({message:"Notification deleted"})
});


// to delete all read notifications
notifyApp.delete("/clear-read",async(req,res)=>{
    // updating unread notifications
    const delete_all=await Notification.deleteMany({recipient:req.user.id,isRead:true});
    //response
    res.status(200).json({message:"All read notifications are deleted successfully!"});
});