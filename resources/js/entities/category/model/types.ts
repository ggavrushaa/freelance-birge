export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    color: string | null;
    icon: string | null;
    sub_categories: SubCategory[];
}
export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}