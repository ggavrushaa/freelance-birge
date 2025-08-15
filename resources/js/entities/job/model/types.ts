import { Category } from "@/entities/category";
import { User } from "@/types";

export interface Job {
    id: number;
    user_id: number;
    author_id: number;
    category_id: number;
    category: Category;
    sub_category_id: number;
    name: string;
    description: string;
    price: string;
    terms: number;
    status: string;
    photo: string | null;
    is_active: boolean;
    premium_mode: boolean;
    express_mode: boolean;
    created_at: string;
    updated_at: string;
    author:User;
}

export interface PaginatedJobs {
    current_page: number;
    data: Job[];
    first_page_url: string;
    last_page_url: string;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
