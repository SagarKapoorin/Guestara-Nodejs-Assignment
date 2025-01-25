import { z } from 'zod';

export const SubCategorySchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  description: z.string().optional(),
  category: z.string().nonempty({ message: "Category is required" }),
  taxApplicable: z.boolean(),
  tax: z.number().optional().nullable(),
});
export const CategorySchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    image: z.string().url({ message: "Image must be a valid URL" }),
    description: z.string().optional(),
    category: z.string().nonempty({ message: "Category is required" }),
    taxApplicable: z.boolean(),
    tax: z.number()
  });