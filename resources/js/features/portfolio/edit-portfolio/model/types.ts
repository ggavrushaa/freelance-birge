export interface EditPortfolioRequest {
    title: string;
    description: string;
    image: File | null;
    category_id: number;
    sub_category_id: number;
    price: number;
    terms: number;
}
