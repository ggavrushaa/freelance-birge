import { Category } from '@/entities/category';
import type { Config } from 'ziggy-js';
import { User as UserType } from './user';
export { type User } from './user';

export interface Auth {
    notifications: [];
    user: UserType;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    categories: Category[];
    csrf_token: string;
    filters: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

export interface CustomerJob {
    id: number;
    name: string;
    description: string;
    photo: string;
    price: string;
    terms: number;
    is_active: boolean;
    express_mode: 0 | 1;
    premium_mode: 0 | 1;
    category_id: number;
    sub_category_id: number;
    user_id: number;
    author_id: number;
    created_at: string;
    updated_at: string;
}

export interface AdditionalOption {
    value: string;
    label: string;
}
