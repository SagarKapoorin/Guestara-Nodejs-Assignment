import { Router } from "express";
import Category from "../models/Category.js";
export const CategoryRouter = Router();
CategoryRouter.get("/", async(req, res) => { 
    //to display all category
try{
    const Categories=await Category.find().cache({key:"Category1"});//caching (check cache.ts)
    res.status(200).json({Categories:Categories});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
CategoryRouter.post("/", async(req, res) => { 
    //making new category

})
CategoryRouter.get("/:name",async(req,res)=>{
    //display a category by name
 try{
    const name=req.params;
    const Categor=await Category.find({name:name}).cache({key:"Category2"});
    res.status(200).json({Category:Categor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})