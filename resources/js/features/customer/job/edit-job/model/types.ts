export interface EditCustomerJobRequest {
    name: string;
    description: string;
    photo: File | null;
    price: string;
    terms: string;
    is_active: boolean;
    express_mode: boolean;
    premium_mode: boolean;
    category_id: number;
    sub_category_id: number;
    user_id: number;
}

export type EditCustomerJobFormValues = Omit<
    EditCustomerJobRequest,
     'terms' | 'category_id' | 'sub_category_id' | "express_mode" | "premium_mode" | "photo" | "user_id"
> & {
    terms: string | null;
    category_id: number | null;
    sub_category_id: number | null;
    express_mode: 0 | 1;
    premium_mode: 0 | 1;
    photo?:  File | null;
};
