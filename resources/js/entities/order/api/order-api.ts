import { api } from "@/shared/api";
import { OrderApi } from "../model/types/order-api";

export const orderApi:OrderApi = {
    getOrders: async () => {
        try {
            const resp = await api.get('/orders');
            return resp.data;
        } catch (error) {
            console.error(error);
        }
    },
};
