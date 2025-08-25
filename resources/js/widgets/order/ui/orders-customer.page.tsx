import { Job } from '@/entities/job';
import { OrderArchiveCard, OrderCard, OrderTab, useGetOrders } from '@/entities/order';
import { withExpand } from '@/shared/components/hoc/with-expand';
import { statusIcons } from '@/shared/consts';
import { Card } from '@/shared/ui/card';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const ExpandableOrderArchiveCard = withExpand(OrderArchiveCard);

export const OrdersCustomerPage = () => {
    const [activeTab, setActiveTab] = useState<'orders' | 'service'>('orders');

    const handleClickTab = (name: 'orders' | 'service') => {
        setActiveTab(name);
    };

    const { data } = useGetOrders();

    const orders = (data?.orders ?? []) as Job[];
    const archive = (data?.archive ?? []) as Job[];

    return (
        <section className="flex-1 flex-col bg-[#efeff4] p-6 pt-25">
            <Card className="mb-4 grid grid-cols-2 gap-0 p-1">
                <OrderTab
                    onClick={() => handleClickTab('orders')}
                    isActive={activeTab === 'orders'}
                    title="Заказы"
                    count={orders.length}
                />
                <OrderTab
                    onClick={() => handleClickTab('service')}
                    isActive={activeTab === 'service'}
                    title="Услуги"
                    count={100}
                />
            </Card>
            <Link href='/orders/archive'>
                <ExpandableOrderArchiveCard count={archive.length} isOpen={activeTab === 'service'} />
            </Link>
            <div className="flex flex-col gap-2">
                {orders.map((order) => (
                    <OrderCard
                        icon={<img src={statusIcons[order.status]} className="w-7" />}
                        title={order.name}
                        status={order.status}
                        terms={order.terms}
                        price={parseFloat(order.price)}
                        count={0}
                    />
                ))}
            </div>
        </section>
    );
};
