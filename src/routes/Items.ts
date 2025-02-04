import { Router } from "express";
import Items from "../models/Items.js";
import Category from "../models/Category.js";
import { clearHash } from "../helpers/cache.js";
import SubCategory from "../models/SubCategory.js";
export const ItemsRouter = Router();
ItemsRouter.get("/", async(req, res) => { 
    //getting all items
  try{
    const Itemss=await Items.find().cache({key:"Items"});
    res.status(200).json({Items:Itemss});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    }
})
ItemsRouter.post("/", async(req, res) => { 
    //creating item under category or subcategory
    try{
        const { name, image, description, baseAmount, discount, categoryName, subCategoryName, taxApplicable, tax } = req.body;
        //check if category or subcategory name is provided
        if(!(categoryName && subCategoryName)){
             res.status(400).json({ error: "categoryName or subCategoryName is required" });
             return;
        }
        const categoryMatch = await Category.findOne({
          $or: [
            { name: categoryName || null }, // Check category name
            { name: subCategoryName || null }, // Check subcategory name
          ],
        });
      
        //If no category or subcategory matches, send a failure response
        if (!categoryMatch) {
          res.status(404).json({ error: "No matching category or subcategory found" });
          return;
        }
        //aggregation pipeline
        const pipeline = [
          {
            //Step1: Match the category or sub-category by name
            $match: {
              $or: [
                { name: categoryName ? categoryName : null }, //match category by name
                { name: subCategoryName ? subCategoryName : null }, //match sub-category by name
              ],
            },
          },
          {
            //Step2: add the default tax applicability and tax if not provided in the input acc to category
            $addFields: {
              taxApplicable: { $ifNull: [taxApplicable, "$taxApplicable"] },
              tax: { $ifNull: [tax, "$tax"] },
            },
          },
          {
            //step3:create the final item document with calculated fields
            $project: {
              name: name,
              image: image,
              description: description,
              baseAmount: baseAmount,
              discount: discount,
              category: categoryName ? categoryName : null,
              subCategory: subCategoryName ? subCategoryName : null,
              taxApplicable: "$taxApplicable",
              tax: "$tax",
              finalPrice: {
                $add: [
                  { $subtract: [baseAmount, discount] }, //base - Discount
                  {
                    $cond: [
                      "$taxApplicable", //add tax if applicable
                      { $multiply: [baseAmount, { $divide: ["$tax", 100] }] },
                      0,
                    ],
                  },
                ],
              },
            },
          },
          {
            //step4:insert the item into the items collection
            $merge: {
              into: "items", //target collection
              on: "_id", //use _id to avoid duplicates
              whenMatched: "merge", //merge if exists
              whenNotMatched: "insert", //insert if not exists
            },
          },
        ];
        //clearing cache
        await clearHash("Items");
        
        const result = await Category.aggregate(pipeline as any[]);
        res.status(200).json({ message:"Successfully Created" });   
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
})
ItemsRouter.get("/category/:category",async(req,res)=>{
    //getting items under a category
    try{
        const result=await Items.find({category:req.params.category}).cache({key:"Items"});
      
          if (result.length === 0) {
           res.status(404).json({ error: "No items found" });
           return;
          }
      
          console.log("Fetched Items:", result);
         res.status(200).json({ result });
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
    
})  
ItemsRouter.get("/subcategory/:subcategory",async(req,res)=>{
    //getting items under subcategory
    try{
        const result=await Items.find({subCategory:req.params.subcategory}).cache({key:"Items"});
      
          if (result.length === 0) {
           res.status(404).json({ error: "No items found" });
           return;
          }
      
          console.log("Fetched Items:", result);
         res.status(200).json({ result });
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Err :"+err});
    }
    
})  
ItemsRouter.get("/:name",async(req,res)=>{
    //getting item under name
     try{
        const {name}=req.params;
        const Item=await Items.find({name:name}).cache({key:"Items"});
        res.status(200).json({Item:Item});
        }catch(err){
            console.log(err);
            res.status(400).json({message:"Error "+err});
        }
})
ItemsRouter.put("/:name",async(req,res)=>{
  //updating item under name
    try{
        const {name}=req.params;
        const { image, description, baseAmount, discount, categoryName, subCategoryName, taxApplicable, tax } = req.body;
        //check if category or subcategory name is exist
        const categoryMatch = await Category.findOne({
          $and: [
            categoryName ? { name: categoryName } : {},
            subCategoryName ? { name: subCategoryName } : {},
          ],
        });
        if (!categoryMatch) {
          res.status(404).json({ error: "No matching category or subcategory found" });
          return;
        }
        const updateData: any = {};
        if (image) updateData.image = image;
        if (description) updateData.description = description;
        if (baseAmount) updateData.baseAmount = baseAmount;
        if (discount) updateData.discount = discount;
        if (categoryName) updateData.category = categoryName;
        if (subCategoryName) updateData.subCategory = subCategoryName;
        if (taxApplicable !== undefined) updateData.taxApplicable = taxApplicable;
        if (tax) updateData.tax = tax;

        const updatedItem = await Items.findOneAndUpdate({ name: name }, updateData, { new: true });
        await clearHash("Items");
        res.status(200).json({Item:updatedItem});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error "+err});
    } 
})