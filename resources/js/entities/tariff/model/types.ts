export interface Tariff {
    id: number;
    name: string;
    description: string;
    price: number;
    term: number;
    corrections: number;
    additional_options: unknown[] | null;
    freelance_gig_id: number;
    created_at: string;
    updated_at: string;
}
