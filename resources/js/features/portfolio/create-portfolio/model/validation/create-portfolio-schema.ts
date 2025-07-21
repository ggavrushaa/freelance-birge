import z from 'zod';

export const createPortfolioSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    image: z.any().nullable(),
    category_id: z.number(),
    sub_category_id: z.number(),
    price: z.number().min(0),
    terms: z.int().min(0),
});
