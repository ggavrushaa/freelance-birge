import { Category, SubCategory } from '@/entities/category';

export interface Portfolio {
    id: number;
    title: string;
    description: string;
    image: string | null;
    is_published: 1 | 0;
    terms: number;
    price: number;
    category: Category;
    category_id: Category['id'];
    sub_category: SubCategory;
    sub_category_id: SubCategory['id'];
    profile_id: number;
    created_at: string;
    updated_at: string;
}
