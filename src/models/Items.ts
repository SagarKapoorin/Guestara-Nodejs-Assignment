import mongoose, { Schema, Document } from 'mongoose';
export interface Item_Schema extends Document {
  name: string;
  image: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  subcategoryId?: mongoose.Types.ObjectId;
  taxApplicable: boolean;
  tax: number;
  baseAmount: number;
  discount: number;
  totalAmount: number;
}
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true, index:true },
  image: { type: String },
  description: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
  taxApplicable: { type: Boolean, required: true },
  tax: { 
    type: Number, 
    required: function (this: Item_Schema){ 
      return this.taxApplicable; 
    },
  },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
});
// ItemSchema.index({ name: 1 });
export default mongoose.model<Item_Schema>('Item', ItemSchema);
