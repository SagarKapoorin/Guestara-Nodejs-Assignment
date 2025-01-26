import { Router } from "express";
import SubCategory from "../models/SubCategory.js";
import { clearHash } from "../helpers/cache.js";
import Category from "../models/Category.js";
import { SubCategorySchema } from "../types/index.js";
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
        const parsedData = SubCategorySchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ message: "Validation failed" });
            return;
          }        
        const { name, image, description, category, taxApplicable, tax } = req.body;
        const categoryExists = await Category.findOne({name:category});
        if (!categoryExists) {
           res.status(400).json({ error: 'Invalid category name' });
           return;
        }
        const newSubcategory= new SubCategory({
          name,
          image,
          description,
          categoryId: categoryExists._id,
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
    const {name}=req.params;
    const SubCategor=await SubCategory.find({name:name}).cache({key:"SubCategory"});
    res.status(200).json({SubCategory:SubCategor});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
SubCategoryRouter.put("/:name",async(req,res)=>{    
    //update a subcategory by name
    try{
        const { name } = req.params;
        const { image, description, category, taxApplicable, tax } = req.body;
        // Checking if the category exists if provided
        let categoryExists = null;
        if (category !== undefined) {
            categoryExists = await Category.findOne({ name: category });
            if (!categoryExists) {
            res.status(400).json({ error: 'Invalid category name' });
            return;
            }
        }

        // Preparing update data
        const updateData: any = {};
        if (image) updateData.image = image;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (categoryExists) updateData.categoryId = categoryExists._id;
        if (taxApplicable !== undefined) updateData.taxApplicable = taxApplicable;
        if (tax) updateData.tax = tax;

        // Updating the subcategory
        const updatedSubCategory = await SubCategory.findOneAndUpdate({ name: name }, updateData, { new: true });
        await clearHash("SubCategory");
        if(!updatedSubCategory){

            res.status(404).json({message:"SubCategory not found"});
            return
        }
        await clearHash("SubCategory");
        res.status(200).json({ SubCategory: updatedSubCategory });
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})