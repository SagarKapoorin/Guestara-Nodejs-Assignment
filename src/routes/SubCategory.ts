import { Router } from "express";
import SubCategory from "../models/SubCategory.js";
export const SubCategoryRouter = Router();
SubCategoryRouter.get("/", async(req, res) => { 
    try{
    const SubCategories=await SubCategory.find().cache({key:"SubCategory1"});
    res.status(200).json({SubCategories:SubCategories});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }

})
SubCategoryRouter.post("/", (req, res) => { 

})
SubCategoryRouter.post("/category/:category",(req,res)=>{
    
})
SubCategoryRouter.get("/category/:category",async(req,res)=>{
    try{
        const category=req.params;
        const output=undefined

        res.status(200).json({SubCategory:output});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
SubCategoryRouter.get("/:name",async(req,res)=>{
    try{
    const name=req.params;
    const SubCategor=await SubCategory.find({name:name}).cache({key:"Subcategory2"});
    res.status(200).json({SubCategory:SubCategor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})