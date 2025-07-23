import z from 'zod';

export const editTariffSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    price: z.number().min(0),
    term: z.number().min(1),
    corrections: z.number().min(0),
    additional_options: z
        .array(
            z.object({
                value: z.string(),
                label: z.string(),
            }),
        )
        .nullable(),
});
