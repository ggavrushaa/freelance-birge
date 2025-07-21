export interface Profile {
    id: number;
    user_id: number;
    description: string;
    avatar:string;
    balance: number;
    rating: number;
    reviews_count: number;
    orders_count: number;
    completed_orders_count: number;
    created_at : number;
    updated_at: number;
}