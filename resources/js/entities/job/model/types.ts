export interface Job {
    id: number;
    user_id: number;
    author_id: number;
    category_id: number;
    sub_category_id: number;
    name: string;
    description: string;
    price: string;
    terms: number;
    status : string;
    photo: string | null;
    is_active: boolean;
    premium_mode: boolean;
    express_mode: boolean;
    created_at:string;
    updated_at : string;
}