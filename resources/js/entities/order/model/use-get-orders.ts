import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { orderApi } from '../api/order-api';

type UseGetOrdersStableOptions = 'queryKey' | 'queryFn';
type Responce = Awaited<ReturnType<typeof orderApi.getOrders>>;
type UseGetOrdersOptions = Omit<UseQueryOptions<Responce, Error>, UseGetOrdersStableOptions>;

export const useGetOrders = (options?: UseGetOrdersOptions) => {
    return useQuery<Responce, Error>({
        queryKey: ['orders'],
        queryFn: () => orderApi.getOrders(),
        ...options,
    });
};
