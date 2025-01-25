import { Router } from "express";
import Items from "../models/Items.js";
export const ItemsRouter = Router();
ItemsRouter.get("/", async(req, res) => { 
    //getting all items
  try{
    const Itemss=await Items.find().cache({key:"Items1"});
    res.status(200).json({Items:Itemss});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
ItemsRouter.post("/category/:category", async(req, res) => { 
    //creating item under category or subcategory
    try{

    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
})
ItemsRouter.get("/category/:category",async(req,res)=>{
    //getting items under a category
    try{

    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
    
})  
ItemsRouter.get("/subcategory/:subcategory",async(req,res)=>{
    //getting items under subcategory
    try{

    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
    
})  
ItemsRouter.get("/:name",async(req,res)=>{
    //getting item under name
     try{
        const name=req.params;
        const Item=await Items.find({name:name}).cache({key:"Items2"});
        res.status(200).json({Item:Item});
        }catch(err){
            console.log(err);
            res.status(400).json({message:"Error "+err});
        }
})