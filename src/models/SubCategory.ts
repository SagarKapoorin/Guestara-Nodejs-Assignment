import mongoose, { Schema, Document } from 'mongoose';
export interface ISubcategory extends Document{
  name: string;
  image: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  taxApplicable: boolean;
  tax: number;
}
const SubcategorySchema= new Schema({
  name: { type: String, required: true ,index:true },
  image: { type: String },
  description: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  taxApplicable: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
});
// SubcategorySchema.index({ name: 1 });
export default mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);
