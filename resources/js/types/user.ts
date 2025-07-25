export interface User {
    id: number;
    telegram_id: string;
    username: string;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    bio: string | null;
    balance: string;
    rating: number;
    orders_count: number;
    completed_orders_count: number;
    canceled_orders_count: number;
    disputes_count: number;
    win_disputes_count: number;
    lose_disputes_count: number;
    referrals_count: number;
    seed_phrase: string[];
    pin_code: string;
    pin_code_attempts: number;
    pin_code_blocked_until: string | null;
    email: string | null;
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
}
