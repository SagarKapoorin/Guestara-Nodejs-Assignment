import { Router } from "express";
import Items from "../models/Items.js";
import Category from "../models/Category.js";
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
        const { name, image, description, baseAmount, discount, categoryName, subCategoryName, taxApplicable, tax } = req.body;
        //check if category or subcategory name is provided
        if(!(categoryName && subCategoryName)){
             res.status(400).json({ error: "categoryName or subCategoryName is required" });
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
    
        const result = await Category.aggregate(pipeline as any[]);
        res.status(200).json({ result });   
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