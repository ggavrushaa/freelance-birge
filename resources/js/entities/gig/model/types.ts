import { Tariff } from '@/entities/tariff/model/types';

export interface Gig {
    id: number;
    user_id: number;
    name: string;
    photo: string | null;
    status: string;
    tariffs: Tariff[];
    category_id: number;
    sub_category_id: number;
    is_active: boolean;
    express_mode: boolean;
    premium_mode: boolean;
    created_at: string;
    updated_at: string;
}

export interface PaginatedGigs {
    current_page: number;
    data: Gig[];
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
