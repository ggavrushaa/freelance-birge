import type { Config } from 'ziggy-js';
import { User as UserType } from './user';
export { type User } from './user';

export interface Category {
    color: string | null;
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
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

export interface Auth {
    user: UserType;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface CustomerJob {
    id: number;
    name: string;
    description: string;
    photo: string;
    price: string;
    terms: string;
    is_active: boolean;
    express_mode: 0 | 1;
    premium_mode: 0 | 1;
    category_id: number;
    sub_category_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}