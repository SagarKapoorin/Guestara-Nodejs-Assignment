import { Router } from "express";
import SubCategory from "../models/SubCategory.js";
import { clearHash } from "../helpers/cache.js";
import Category from "../models/Category.js";
export const SubCategoryRouter = Router();
SubCategoryRouter.get("/", async(req, res) => { 
    try{
    const SubCategories=await SubCategory.find().cache({key:"SubCategory"});
    res.status(200).json({SubCategories:SubCategories});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }

})
SubCategoryRouter.post("/", async(req, res) => { 
    try {
        const { name, image, description, categoryId, taxApplicable, tax } = req.body;
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
           res.status(400).json({ error: 'Invalid category ID' });
           return;
        }
        const newSubcategory= new SubCategory({
          name,
          image,
          description,
          categoryId,
          taxApplicable,
          tax,
        });
        await clearHash('SubCategory');
        await newSubcategory.save();
        res.status(201).json(newSubcategory);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error ' + err });
    }
})
SubCategoryRouter.get("/category/:category",async(req,res)=>{
    try{
        const { category }=req.params;
        const category1 = await Category.findOne({ name: category });
        if (!category1) {
             res.status(404).json({ error: 'Category not found' });
             return;
        }
    const subcategories = await SubCategory.find({ categoryId: category1._id });
    res.status(200).json(subcategories);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
SubCategoryRouter.get("/:name",async(req,res)=>{
    try{
    const name=req.params;
    const SubCategor=await SubCategory.find({name:name}).cache({key:"SubCategory"});
    res.status(200).json({SubCategory:SubCategor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})