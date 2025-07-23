import z from 'zod';

export const createProfileSchema = z.object({
    description: z.string().min(1).max(255),
    languages: z
        .array(
            z.object({
                id: z.number(),
                code: z.string(),
                name: z.string(),
                created_at: z.string(),
                updated_at: z.string(),
            }),
        )
        .nullable(),
    skills: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
                created_at: z.string(),
                updated_at: z.string(),
            }),
        )
        .nullable(),
});
