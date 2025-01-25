import { Router } from "express";
import Category from "../models/Category.js";
import { clearHash } from "../helpers/cache.js";
export const CategoryRouter = Router();
CategoryRouter.get("/", async(req, res) => { 
    //to display all category
try{
    const Categories=await Category.find().cache({key:"Category"});//caching (check cache.ts)
    res.status(200).json({Categories:Categories});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
CategoryRouter.post("/", async(req, res) => { 
    //making new category
    try{
        const { name, image, description, taxApplicable, tax, taxType } = req.body;
        const newCategory=new Category({
          name,
          image,
          description,
          taxApplicable,
          tax,
          taxType,
        });
        await clearHash("Category");//clearing cache
        await newCategory.save();
        res.status(200).json({Category:newCategory});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }

})
CategoryRouter.get("/:name",async(req,res)=>{
    //display a category by name
 try{
    const name=req.params;
    const Categor=await Category.find({name:name}).cache({key:"Category"});
    res.status(200).json({Category:Categor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})