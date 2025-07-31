import { Card } from '@/shared/ui/card';
import { ReactNode } from 'react';

interface DashboardOrdersWidget<T> {
    header: ReactNode;
    orders: T[];
    renderOrder: (order: T) => ReactNode;
}

export const DashboardOrdersWidget = <T,>(props: DashboardOrdersWidget<T>) => {
    const { header, orders, renderOrder } = props;
    return (
        <Card className="mx-6 mb-5 gap-3 px-4 py-3">
            {header}
            <div className="flex flex-col gap-3 [&>a:last-of-type]:border-0">
                {orders.map((order) => renderOrder(order))}
            </div>
        </Card>
    );
};
