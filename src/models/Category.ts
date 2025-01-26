import mongoose, { Schema, Document } from 'mongoose';
export interface ICategory extends Document {
  name: string;
  image: string;
  description: string;
  taxApplicable: boolean;
  tax: number;
  taxType: string;
}
const CategorySchema= new Schema({
  name: { type: String, required: true, unique: true , index:true},
  image: { type: String, required: true },
  description: { type: String },
  taxApplicable: { type: Boolean, required: true, default: false },
  tax: { 
    type: Number, 
    required: function (this: ICategory) { 
      return this.taxApplicable; 
    },
  },
  taxType: { 
    type: String, 
    required: function (this: ICategory) { 
      return this.taxApplicable; 
    },
  },
});
export default mongoose.model<ICategory>('Category', CategorySchema);
