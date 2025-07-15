import { z } from 'zod';

export const createCustomerJobSchema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(1).max(120),
    price: z.string().min(1),
    terms: z.string(),
    category_id: z.number(),
    sub_category_id: z.number(),
    express_mode: z.boolean(),
    premium_mode: z.boolean(),
    photo: z.file().nullable(),
});