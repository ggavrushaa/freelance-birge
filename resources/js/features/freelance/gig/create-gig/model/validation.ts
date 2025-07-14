import z from "zod";

export const createFreelanceGigSchema = z.object({
    name: z.string().min(1).max(40),
    premium_mode: z.boolean(),
    express_mode: z.boolean(),
    category_id: z.number(),
    sub_category_id: z.number().nullable(),
    photo: z.any().nullable(),
});