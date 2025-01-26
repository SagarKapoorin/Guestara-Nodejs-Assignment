import { Router } from "express";
import Category from "../models/Category.js";
import { clearHash } from "../helpers/cache.js";
import { CategorySchema } from "../types/index.js";
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
         const parsedData=CategorySchema.safeParse(req.body);
                if (!parsedData.success) {
                    res.status(400).json({ message: "Validation failed" });
                    return;
        }  
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
    const {name}=req.params;
    const Categor=await Category.find({name:name}).cache({key:"Category"});
    res.status(200).json({Category:Categor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
CategoryRouter.put("/:name",async(req,res)=>{
    //update a category by name
    try{
        const {name}=req.params;
        const { image, description, taxApplicable, tax, taxType } = req.body;
        //for checking to update only new data , data which is send over req.body
        const updateData: any = {};
        if (image) updateData.image = image;
        if (description) updateData.description = description;
        if (taxApplicable !== undefined) updateData.taxApplicable = taxApplicable;
        if (tax) updateData.tax = tax;
        if(taxType) updateData.taxType = taxType;
        //update the category
        const updatedCategory=await Category.findOneAndUpdate({name:name},updateData,{new:true});
        await clearHash("Category");
        if(!updatedCategory){
            res.status(404).json({message:"Category not found"});
            return;
        }
        res.status(200).json({Category:updatedCategory});
       await clearHash("Category");
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }   
})