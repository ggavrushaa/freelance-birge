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
