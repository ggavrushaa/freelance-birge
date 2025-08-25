import { Gig } from '@/entities/gig';
import { Job } from '@/entities/job';

export type Order = Job | Gig;

export interface OrderApi {
    getOrders: () => Promise<{
        archive: Order[];
        orders: Order[];
    }>;
}
