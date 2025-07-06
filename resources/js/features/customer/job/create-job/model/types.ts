export interface CreateCustomerJobRequest {
    name: string;
    description: string;
    photo: string;
    price: string;
    terms: string;
    is_active: boolean;
    express_mode: boolean;
    premium_mode: boolean;
    category_id: number;
    sub_category_id: number;
    user_id: number;
}

export type CreateCustomerJobFormValues = Omit<
    CreateCustomerJobRequest,
    'user_id' | 'terms' | 'category_id' | 'sub_category_id'
> & {
    terms: string | null;
    category_id: number | null;
    sub_category_id: number | null;
};
